#!/usr/bin/env python3
"""Parse the original exercise PDF into structured JSON and question crops.

Usage:
  python3 scripts/parse_original_exercises.py
  python3 scripts/parse_original_exercises.py --max-pages 5

Dependencies:
  - Python: pdfplumber
  - System: Poppler command `pdftocairo` (used for PNG crops)
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable

import pdfplumber

PARSER_VERSION = "original-exercises-pdfplumber-columns-v2"

VP_RE = re.compile(r"^VP(?P<chapter>\d{1,3})\.(?P<section>\d{1,3})\.(?P<num>\d{1,3})(?=\s|$)")
Q_RE = re.compile(r"^Q(?P<chapter>\d{1,3})\.(?P<num>\d{1,3})(?=\s|$)")
CHAPTER_Q_RE = re.compile(r"^(?P<chapter>\d{1,3})\.(?P<num>\d{1,3})(?=\s|$)")
SECTION_RE = re.compile(r"^Section\s+(\d{1,2})\s*$", re.IGNORECASE)
TEXTBOOK_SECTION_RE = re.compile(r"^Section\s+(\d{1,3})\.\d+\b", re.IGNORECASE)
CHAPTER_RE = re.compile(r"\bCh(?:apter)?\s*(\d{1,3})\b", re.IGNORECASE)
DIFF_RE = re.compile(r"(•{1,3})")
TAG_RE = re.compile(r"\b(CP|CALC|DATA|BIO)\b")
FIGURE_RE = re.compile(r"\b(?:Fig(?:ure)?\.?\s*)([A-Z]?\d+\.\d+)\b", re.IGNORECASE)
SKIP_LINE_RE = re.compile(
    r"^(?:GUIDED PRACTICE|KEY EXAMPLE|VARIATION PROBLEMS|DISCUSSION QUESTIONS|"
    r"EXERCISES|PROBLEMS|CHALLENGE PROBLEMS|SOLUTION GUIDE|IDENTIFY and SET UP|"
    r"EXECUTE|EVALUATE|Chapter \d+ Media Assets|For assigned homework)\b",
    re.IGNORECASE,
)
SKIP_CONTAINS_RE = re.compile(r"(?:homework and other learning materials|Mastering Physics)", re.IGNORECASE)
IGNORE_REST_OF_COLUMN_RE = re.compile(r"^BRIDGING PROBLEM\b", re.IGNORECASE)


@dataclass
class Line:
    page: int
    column: int
    text: str
    x0: float
    y0: float
    x1: float
    y1: float
    page_width: float
    page_height: float


@dataclass
class Question:
    qid: str
    section: str
    source_page: int
    lines: list[Line] = field(default_factory=list)
    difficulty: str | None = None
    tags: list[str] = field(default_factory=list)

    def add_line(self, line: Line) -> None:
        self.lines.append(line)

    def to_record(self, assets: list[str]) -> dict:
        all_text = normalize_text(" ".join(ln.text for ln in self.lines))
        figure_refs = sorted({m.group(1) for m in FIGURE_RE.finditer(all_text)})
        spans = segment_bboxes(self.lines)
        return {
            "id": self.qid,
            "section": self.section,
            "page": self.source_page,
            "sourcePage": self.source_page,
            "text": all_text,
            "difficulty": self.difficulty,
            "tags": sorted(set(self.tags)),
            "bbox": spans[0]["bbox"] if spans else None,
            "spans": spans,
            "figure_refs": figure_refs,
            "assets": assets,
        }


def run_cmd(cmd: list[str]) -> None:
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except FileNotFoundError as exc:
        tool = cmd[0]
        raise SystemExit(
            f"Missing required tool '{tool}'. Install Poppler first (macOS: brew install poppler)."
        ) from exc
    except subprocess.CalledProcessError as exc:
        raise SystemExit(f"Command failed: {' '.join(cmd)}\n{exc.stderr}") from exc


def normalize_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def word_mid_x(word: dict) -> float:
    return (float(word["x0"]) + float(word["x1"])) / 2.0


def word_mid_y(word: dict) -> float:
    return (float(word["top"]) + float(word["bottom"])) / 2.0


def detect_column_boundary(words: list[dict], page_width: float) -> float:
    x_positions = sorted(float(word["x0"]) for word in words)
    candidates: list[tuple[float, float]] = []
    min_x = page_width * 0.25
    max_x = page_width * 0.75
    for left, right in zip(x_positions, x_positions[1:]):
        if min_x <= left <= max_x and min_x <= right <= max_x:
            candidates.append((right - left, (left + right) / 2.0))
    if not candidates:
        return page_width / 2.0
    gap, boundary = max(candidates, key=lambda item: item[0])
    return boundary if gap >= 12.0 else page_width / 2.0


def assign_column(word: dict, boundary: float) -> int:
    return 0 if float(word["x0"]) < boundary else 1


def words_to_lines(words: list[dict], page_num: int, column: int, width: float, height: float) -> list[Line]:
    if not words:
        return []

    sorted_words = sorted(words, key=lambda w: (word_mid_y(w), float(w["x0"])))
    grouped: list[list[dict]] = []
    tolerance = 3.0

    for word in sorted_words:
        mid_y = word_mid_y(word)
        if not grouped:
            grouped.append([word])
            continue
        prev_mid_y = sum(word_mid_y(w) for w in grouped[-1]) / len(grouped[-1])
        if abs(mid_y - prev_mid_y) <= tolerance:
            grouped[-1].append(word)
        else:
            grouped.append([word])

    lines: list[Line] = []
    for line_words in grouped:
        line_words.sort(key=lambda w: float(w["x0"]))
        text = normalize_text(" ".join(str(w["text"]) for w in line_words))
        if not text:
            continue
        lines.append(
            Line(
                page=page_num,
                column=column,
                text=text,
                x0=min(float(w["x0"]) for w in line_words),
                y0=min(float(w["top"]) for w in line_words),
                x1=max(float(w["x1"]) for w in line_words),
                y1=max(float(w["bottom"]) for w in line_words),
                page_width=width,
                page_height=height,
            )
        )
    return lines


def extract_lines_with_pdfplumber(pdf_path: Path, max_pages: int | None = None) -> list[Line]:
    lines: list[Line] = []
    with pdfplumber.open(str(pdf_path)) as pdf:
        total = len(pdf.pages)
        upto = min(total, max_pages) if max_pages else total
        for page_idx in range(upto):
            page = pdf.pages[page_idx]
            words = page.extract_words(
                x_tolerance=2,
                y_tolerance=2,
                keep_blank_chars=False,
                use_text_flow=False,
            )
            page_num = page_idx + 1
            page_width = float(page.width)
            page_height = float(page.height)
            boundary = detect_column_boundary(words, page_width)
            by_column = {0: [], 1: []}
            for word in words:
                by_column[assign_column(word, boundary)].append(word)
            for column in (0, 1):
                lines.extend(words_to_lines(by_column[column], page_num, column, page_width, page_height))
    return lines


def union_bbox(lines: Iterable[Line]) -> list[float] | None:
    items = list(lines)
    if not items:
        return None
    return [
        round(max(0.0, min(ln.x0 for ln in items)), 2),
        round(max(0.0, min(ln.y0 for ln in items)), 2),
        round(min(items[0].page_width, max(ln.x1 for ln in items)), 2),
        round(min(items[0].page_height, max(ln.y1 for ln in items)), 2),
    ]


def lines_on_page(lines: Iterable[Line], page: int) -> list[Line]:
    return [ln for ln in lines if ln.page == page]


def lines_by_page(lines: Iterable[Line]) -> dict[int, list[Line]]:
    result: dict[int, list[Line]] = {}
    for line in lines:
        result.setdefault(line.page, []).append(line)
    return result


def lines_by_page_column(lines: Iterable[Line]) -> dict[tuple[int, int], list[Line]]:
    result: dict[tuple[int, int], list[Line]] = {}
    for line in lines:
        result.setdefault((line.page, line.column), []).append(line)
    return result


def segment_bboxes(lines: Iterable[Line]) -> list[dict]:
    spans: list[dict] = []
    for (page, column), segment_lines in sorted(lines_by_page_column(lines).items()):
        bbox = union_bbox(segment_lines)
        if bbox:
            spans.append({"page": page, "column": column, "bbox": bbox})
    return spans


def to_slug(qid: str) -> str:
    return re.sub(r"[^A-Za-z0-9.]+", "_", qid).strip("_")


def crop_question(pdf_path: Path, out_png: Path, page: int, bbox: list[float], dpi: int = 200) -> None:
    x0, y0, x1, y1 = bbox
    x_pad = 6.0
    top_pad = 4.0
    bottom_pad = 1.0
    x0, y0, x1, y1 = (
        max(0.0, x0 - x_pad),
        max(0.0, y0 - top_pad),
        x1 + x_pad,
        y1 + bottom_pad,
    )
    scale = dpi / 72.0
    px = max(0, int(x0 * scale))
    py = max(0, int(y0 * scale))
    pw = max(1, int((x1 - x0) * scale))
    ph = max(1, int((y1 - y0) * scale))
    out_png.parent.mkdir(parents=True, exist_ok=True)
    run_cmd(
        [
            "pdftocairo",
            "-png",
            "-singlefile",
            "-f",
            str(page),
            "-l",
            str(page),
            "-r",
            str(dpi),
            "-x",
            str(px),
            "-y",
            str(py),
            "-W",
            str(pw),
            "-H",
            str(ph),
            str(pdf_path),
            str(out_png.with_suffix("")),
        ]
    )


def question_id_at_start(text: str, active_chapter: str | None) -> tuple[str, str] | None:
    for regex in (VP_RE, Q_RE):
        match = regex.match(text)
        if not match:
            continue
        chapter = match.group("chapter")
        if active_chapter and chapter != active_chapter:
            return None
        qid = match.group(0)
        return qid, text[match.end() :].strip()
    match = CHAPTER_Q_RE.match(text)
    if not match or not active_chapter:
        return None
    if match.group("chapter") != active_chapter:
        return None
    qid = match.group(0)
    meta = text[match.end() :].strip()
    if not re.match(r"^[•●]{1,3}(?:\s|$)", meta):
        return None
    return qid, meta


def parse_meta_prefix(meta: str) -> tuple[str | None, list[str]]:
    tokens = meta.split()
    difficulty = None
    tags: list[str] = []
    if tokens and re.fullmatch(r"[•●]{1,3}", tokens[0]):
        difficulty = tokens.pop(0).replace("●", "•")
    while tokens and tokens[0] in {"CP", "CALC", "DATA", "BIO"}:
        tags.append(tokens.pop(0))
    return difficulty, tags


def filter_non_question_lines(lines: list[Line]) -> list[Line]:
    filtered: list[Line] = []
    ignored_columns: set[tuple[int, int]] = set()
    for line in sorted(lines, key=lambda ln: (ln.page, ln.column, ln.y0, ln.x0)):
        key = (line.page, line.column)
        if key in ignored_columns:
            continue
        if IGNORE_REST_OF_COLUMN_RE.match(line.text):
            ignored_columns.add(key)
            continue
        if SKIP_LINE_RE.match(line.text) or SKIP_CONTAINS_RE.search(line.text):
            continue
        filtered.append(line)
    return filtered


def parse_questions(lines: list[Line]) -> list[Question]:
    questions: list[Question] = []
    current: Question | None = None
    section = "00"
    active_chapter: str | None = None

    for line in filter_non_question_lines(lines):
        sec = SECTION_RE.match(line.text)
        if sec:
            section = sec.group(1).zfill(2)
            active_chapter = None

        chapter_match = CHAPTER_RE.search(line.text)
        if chapter_match:
            active_chapter = chapter_match.group(1)
        textbook_section_match = TEXTBOOK_SECTION_RE.match(line.text)
        if textbook_section_match:
            active_chapter = textbook_section_match.group(1)

        qmatch = question_id_at_start(line.text, active_chapter)
        if qmatch:
            qid, meta = qmatch
            id_chapter = re.match(r"^(?:VP|Q)?(\d{1,3})\.", qid)
            if id_chapter:
                active_chapter = id_chapter.group(1)
            if current:
                questions.append(current)
            current = Question(qid=qid, section=section, source_page=line.page)
            current.add_line(line)
            current.difficulty, current.tags = parse_meta_prefix(meta)
            continue

        if current:
            current.add_line(line)

    if current:
        questions.append(current)
    return questions


def prepare_crop_dir(crop_dir: Path, clean: bool) -> None:
    if clean and crop_dir.exists():
        shutil.rmtree(crop_dir)
    crop_dir.mkdir(parents=True, exist_ok=True)


def write_question_assets(pdf_path: Path, crop_dir: Path, question: Question) -> list[str]:
    assets: list[str] = []
    for (page, column), segment_lines in sorted(lines_by_page_column(question.lines).items()):
        bbox = union_bbox(segment_lines)
        if not bbox:
            continue
        suffix = f"_c{column}"
        if page != question.source_page:
            suffix += f"_p{page:03d}"
        filename = f"p{page:03d}_{to_slug(question.qid)}{suffix}.png"
        out_png = crop_dir / filename
        crop_question(pdf_path, out_png, page=page, bbox=bbox)
        assets.append(str(out_png).replace("\\", "/"))
    return assets


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", default="assets/pdfs/大学物理_原习题集_sources.pdf")
    parser.add_argument("--out-json", default="assets/pdfs/exercise_questions_parsed.json")
    parser.add_argument("--crop-dir", default="assets/exercise_crops")
    parser.add_argument(
        "--max-pages",
        type=int,
        default=None,
        help="Optional upper bound for parsing/cropping pages (for smoke test).",
    )
    parser.add_argument(
        "--no-clean-crops",
        action="store_true",
        help="Do not remove existing files from --crop-dir before writing crops.",
    )
    args = parser.parse_args()

    pdf_path = Path(args.pdf)
    out_json = Path(args.out_json)
    crop_dir = Path(args.crop_dir)
    if not pdf_path.exists():
        raise SystemExit(f"PDF not found: {pdf_path}")

    prepare_crop_dir(crop_dir, clean=not args.no_clean_crops)
    lines = extract_lines_with_pdfplumber(pdf_path, max_pages=args.max_pages)
    questions = parse_questions(lines)

    records: list[dict] = []
    asset_count = 0
    for question in questions:
        assets = write_question_assets(pdf_path, crop_dir, question)
        asset_count += len(assets)
        records.append(question.to_record(assets))

    payload = {
        "source": str(pdf_path).replace("\\", "/"),
        "parser": PARSER_VERSION,
        "count": len(records),
        "questions": records,
    }

    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Parsed questions: {len(records)}")
    print(f"Generated assets: {asset_count}")
    print(f"Wrote JSON: {out_json}")
    print(f"Wrote crops: {crop_dir}")


if __name__ == "__main__":
    main()
