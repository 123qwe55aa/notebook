# 原习题集解析脚本

从 `assets/pdfs/大学物理_原习题集_sources.pdf` 生成结构化题库和题目裁剪图。

## 运行

```bash
python3 scripts/parse_original_exercises.py
```

Smoke test：

```bash
python3 scripts/parse_original_exercises.py --max-pages 5
```

可选参数：

```bash
python3 scripts/parse_original_exercises.py \
  --pdf assets/pdfs/大学物理_原习题集_sources.pdf \
  --out-json assets/pdfs/exercise_questions_parsed.json \
  --crop-dir assets/exercise_crops
```

默认会先删除 `--crop-dir` 再重建，避免旧裁剪图残留。需要保留目录内已有文件时可加：

```bash
python3 scripts/parse_original_exercises.py --no-clean-crops
```

## 输出

JSON 顶层是对象，兼容前端读取：

```json
{
  "source": "assets/pdfs/大学物理_原习题集_sources.pdf",
  "parser": "original-exercises-pdfplumber-columns-v2",
  "count": 0,
  "questions": []
}
```

每个题目包含：

- `id`
- `section`
- `page`
- `sourcePage`
- `text`
- `difficulty`
- `tags`
- `bbox`
- `figure_refs`
- `assets`

`assets` 是题目 crop PNG 路径列表。若题目跨页，会按页生成多个 crop。

## 解析策略

- 使用 `pdfplumber` 读取文本和坐标。
- 每页先按页面中线拆成左右栏，再在栏内按 y/x 排序，避免双栏文本串题。
- 题号只接受以下格式：
  - `VPxx.x.x`
  - `Qxx.x`
  - 当前章节的章节题号，如 Ch21 页面中的 `21.1`
- 章节题号会校验当前章节号，避免把 `6.13`、`1.10`、`65.0` 等普通小数误识别为题号。

## 依赖

- Python 包：`pdfplumber`
- 系统命令：`pdftocairo`（Poppler，用于裁剪 PNG）

macOS 可用：

```bash
brew install poppler
python3 -m venv /tmp/notebook-parse-venv
/tmp/notebook-parse-venv/bin/pip install pdfplumber
/tmp/notebook-parse-venv/bin/python scripts/parse_original_exercises.py --max-pages 5
```
