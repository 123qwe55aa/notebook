# Assets 目录结构说明

## 目录树

```
assets/
├── origin/                          # 教材原始 PDF
│   ├── 第9章  静电场.pdf
│   ├── 第10章 稳恒磁场.pdf
│   ├── 第11章 变换的电磁场.pdf
│   └── 第15章 量子物理基础.pdf
│
└── notebooks/
    └── Electric_Field_Gauss/         # NotebookLM Studio 生成的学习资源集（静电场+相对论）
        ├── audio/                    # 音频
        │   ├── Why Space Shrinks and Time Slows Down.mp3
        │   └── 大物期末逻辑链.mp3
        ├── video/                    # 视频
        │   ├── The Unseen Rules.mp4
        │   ├── 大物期末逻辑链.mp4
        │   └── 物理实在的演变：全景分析.mp4
        ├── infographic/              # 信息图
        │   ├── Physics_ Electrostatics and Relativistic Dynamics.png
        │   ├── Unified University Physics Framework.png
        │   └── 大学物理核心知识框架.png
        ├── quiz/                    # 选择题题库
        │   ├── Physics Quiz.json          # 英文版（主）
        │   ├── Physics Quiz (2).json
        │   ├── Physics Quiz (3).json
        │   └── Physics Quiz.html          # 英文交互版
        ├── flashcards/              # 闪卡
        │   ├── Physics Flashcards.json     # 英文版（主）
        │   ├── Physics Flashcards (2).json
        │   ├── Physics Flashcards (3).json
        │   └── Physics Flashcards.html     # 英文交互版
        ├── mind-map/                 # 思维导图
        │   └── General Physics Concepts.json
        ├── report/                  # 复习报告/指南
        │   ├── 大学物理期末复习指南：电荷与静电场.md
        │   ├── 大学物理期末复习综合指南.html
        │   ├── 大学物理期末复习综合指南：静电场与狭义相对论.md
        │   └── 大学物理核心复习指南：狭义相对论动力学与静电场.md
        ├── slide-deck-pdf/          # PDF 幻灯片
        │   ├── Physics Architecture Blueprint.pdf
        │   ├── Relativity and Electrostatics.pdf
        │   └── The Physics Blueprint.pdf
        ├── slide-deck-pptx/         # PowerPoint 幻灯片
        │   ├── Physics Architecture Blueprint.pptx
        │   ├── Relativity and Electrostatics.pptx
        │   └── The Physics Blueprint.pptx
        └── data-table/              # 公式/数据表
            ├── 物理核心公式汇总表.csv
            └── 物理核心公式汇总表.html
```

## 资源类型分类

| 类型 | 路径前缀 | 说明 |
|------|----------|------|
| `pdf` | `origin/` | 教材章节 PDF |
| `notes` | `notebooks/*/report/` | NotebookLM 生成的复习指南（.md / .html） |
| `quiz` | `notebooks/*/quiz/` | 选择题 JSON 和 HTML 交互版 |
| `flashcard` | `notebooks/*/flashcards/` | 闪卡 JSON 和 HTML 交互版 |
| `audio` | `notebooks/*/audio/` | 音频讲解 |
| `video` | `notebooks/*/video/` | 视频讲解 |
| `infographic` | `notebooks/*/infographic/` | 信息图/框架图 |
| `mind-map` | `notebooks/*/mind-map/` | 思维导图 JSON |
| `slides` | `notebooks/*/slide-deck-pdf/` | PDF 幻灯片 |
| `slides-pptx` | `notebooks/*/slide-deck-pptx/` | PowerPoint 幻灯片 |
| `formula-sheet` | `notebooks/*/data-table/` | 公式汇总表（csv/html） |

## 中英文对应关系

| 中文 | 英文 |
|------|------|
| 大学物理期末复习指南：电荷与静电场.md | Physics Quiz.json |
| 大学物理期末复习综合指南.html | Physics Quiz.html |
| 大学物理期末复习综合指南：静电场与狭义相对论.md | - |
| 大学物理核心复习指南：狭义相对论动力学与静电场.md | - |
| 大学物理核心知识框架.png | Unified University Physics Framework.png |
| 物理核心公式汇总表.csv/html | - |
| 大物期末逻辑链.mp3 / .mp4 | Why Space Shrinks and Time Slows Down.mp3 |
| 物理实在的演变：全景分析.mp4 | - |
| - | The Unseen Rules.mp4 |
| - | Physics Flashcards.json / .html |
| - | General Physics Concepts.json |
| - | Physics Architecture Blueprint.pdf/.pptx |
| - | Relativity and Electrostatics.pdf/.pptx |
| - | The Physics Blueprint.pdf/.pptx |
| - | Physics_ Electrostatics and Relativistic Dynamics.png |
