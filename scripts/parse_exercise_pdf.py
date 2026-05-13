#!/usr/bin/env python3
"""Parse the original exercise PDF into the JSON used by the web app."""

from __future__ import annotations

import json
import re
from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets/pdfs/大学物理_原习题集_sources.pdf"
OUTPUT = ROOT / "assets/pdfs/exercise_questions_parsed.json"

QUESTION_ID = re.compile(
    r"(?<![\w.])((?:VP|Q)?(?:2[1-9]|3[0-9]|4[0-1])\.\d+(?:\.\d+)?)"
    r"(?=\s+(?:[•A-Z(]))"
)
COVER_SECTION = re.compile(r"^Section\s+(\d{2})\s+Ch(\d+)\b")
GUIDE_NOTE = re.compile(
    r"Be sure to review EXAMPLES?.{0,520}?before\s+attempting\s+these\s+problems\.?",
    re.IGNORECASE,
)


def normalize_text(text: str) -> str:
    replacements = {
        "\u00ad": "",
        "\u00a0": " ",
        "\u2002": " ",
        "\u2003": " ",
        "\u2007": " ",
        "\t": " ",
        "\n": " ",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = GUIDE_NOTE.sub(" ", text)
    def dehyphenate(match: re.Match) -> str:
        left, right = match.group(1), match.group(2)
        if right in {"and", "or"}:
            return f"{left}- {right}"
        return f"{left}{right}"

    text = re.sub(r"([A-Za-z])-\s+([a-z]+)", dehyphenate, text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def page_body_text(page: fitz.Page) -> str:
    width = page.rect.width
    blocks = []
    for block in page.get_text("blocks"):
        x0, y0, x1, y1, text, *_ = block
        raw = text.strip()
        if not raw:
            continue
        # Drop running headers/footers. Section cover pages are handled before this.
        if y1 < 52 or y0 > page.rect.height - 28:
            continue
        blocks.append((x0, y0, x1, y1, raw))

    if width >= 620:
        midpoint = width / 2
        left = [b for b in blocks if b[0] < midpoint]
        right = [b for b in blocks if b[0] >= midpoint]
        ordered = sorted(left, key=lambda b: (b[1], b[0])) + sorted(right, key=lambda b: (b[1], b[0]))
    else:
        ordered = sorted(blocks, key=lambda b: (b[1], b[0]))

    return normalize_text(" ".join(block[4] for block in ordered))


def split_questions(text: str, chapter: str) -> list[tuple[str, str]]:
    matches = []
    for match in QUESTION_ID.finditer(text):
        if question_chapter(match.group(1)) != chapter:
            continue
        previous = text[max(0, match.start() - 18) : match.start()].lower()
        if re.search(r"(fig|figure|section|example|examples|eq)\.?\s*$", previous):
            continue
        matches.append(match)

    questions = []
    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        qid = match.group(1)
        body = normalize_text(text[start:end])
        body = re.sub(r"^[•\s]+", "", body)
        # Ignore accidental captures that are table entries, figure labels, or too short to be a problem.
        if len(body) < 35:
            continue
        if body.lower().startswith(("figure ", "table ")):
            continue
        questions.append((qid, body))
    return questions


def question_chapter(qid: str) -> str:
    match = re.search(r"(2[1-9]|3[0-9]|4[0-1])\.", qid)
    return match.group(1) if match else ""


def sort_key(item: dict) -> tuple:
    prefix_rank = 0 if item["id"].startswith("VP") else 1 if item["id"].startswith("Q") else 2
    numbers = tuple(int(part) for part in re.findall(r"\d+", item["id"]))
    return (item["section"], item["page"], numbers, prefix_rank, item["id"])


def parse_pdf() -> dict:
    doc = fitz.open(SOURCE)
    current_section = None
    current_chapter = None
    questions = []
    seen = set()

    for page_index, page in enumerate(doc, start=1):
        raw_text = normalize_text(page.get_text("text"))
        section_match = COVER_SECTION.search(raw_text)
        if section_match:
            current_section = section_match.group(1)
            current_chapter = section_match.group(2)
            continue
        if not current_section or not current_chapter:
            continue

        body = page_body_text(page)
        for qid, text in split_questions(body, current_chapter):
            key = (qid, current_section)
            if key in seen:
                continue
            seen.add(key)
            questions.append(
                {
                    "id": qid,
                    "section": current_section,
                    "page": page_index,
                    "sourcePage": page_index,
                    "text": text,
                }
            )

    questions.sort(key=sort_key)
    return {
        "source": "assets/pdfs/大学物理_原习题集_sources.pdf",
        "parser": "pymupdf-blocks-v2",
        "count": len(questions),
        "questions": questions,
    }


def main() -> None:
    data = parse_pdf()
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {data['count']} questions to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
