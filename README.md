# AI Opportunity Radar Data

## 中文说明

这个仓库是 **AI Opportunity Radar** 的数据仓库和静态 Dashboard。

它承担三件事：

1. **日报中转站**：ChatGPT 计划任务每天把日报数据写入这里。
2. **轻量数据库**：Dashboard 读取 `data/manifest.json` 和 `data/daily/*.json`。
3. **展示站点**：GitHub Pages 通过 `index.html` 托管 Dashboard。

当前系统只保留两类每日产物：

- Dashboard JSON：`data/daily/YYYY-MM-DD.json`
- 正式日报页面：`reports/html/YYYY-MM-DD.html`

PDF 流程已经移除。`reports/html/YYYY-MM-DD.html` 就是正式日报，界面和文案统一称为 **日报**，不再称为 **HTML 日报**。

### 每天写入的文件

ChatGPT 计划任务每天需要更新：

```text
 data/daily/YYYY-MM-DD.json
 reports/html/YYYY-MM-DD.html
 data/manifest.json
```

`manifest.json` 示例：

```json
{
  "latest": "2026-07-03",
  "days": [
    {
      "date": "2026-07-03",
      "file": "data/daily/2026-07-03.json",
      "html": "reports/html/2026-07-03.html"
    }
  ]
}
```

不要在 `manifest.json` 里添加 `pdf` 字段。

### Dashboard 功能

Dashboard 是纯静态页面，不需要后端，主要由以下文件组成：

- `index.html`
- `assets/style.css`
- `assets/app.js`

它支持：

- 查看今日日报
- 查看历史日报
- 打开日报页面
- 查看项目库
- 项目出现次数统计
- 首次出现日期
- 最近出现日期
- 分类筛选
- 搜索
- 本地状态标记：收藏、测试中、已完成、已放弃

状态标记保存在浏览器 `localStorage`，不会写回 GitHub。

### 当前生产流程

```text
ChatGPT 计划任务
↓
生成日报 JSON + 日报 HTML
↓
写入 GitHub 仓库
↓
Dashboard 读取 manifest + daily JSON
↓
用户在 Dashboard 打开日报
```

这个仓库不调用 OpenAI API。ChatGPT 计划任务负责采集、判断和生成日报；Codex 只在需要时维护仓库基础设施。

Dashboard 地址：

```text
https://paxora.github.io/ai-opportunity-radar-data/
```

---

## English Description

This repository is the data warehouse and static Dashboard for **AI Opportunity Radar**.

It has three jobs:

1. Relay station: ChatGPT scheduled tasks write daily report data here.
2. Lightweight database: the Dashboard reads `data/manifest.json` and `data/daily/*.json`.
3. Public display site: GitHub Pages hosts the Dashboard from `index.html`.

## Current Design

The system now keeps only two daily artifacts:

- Dashboard JSON: `data/daily/YYYY-MM-DD.json`
- Report HTML: `reports/html/YYYY-MM-DD.html`

PDF output has been removed. The HTML file is the official daily report, and the UI should call it **日报** rather than **HTML 日报**.

## What Writes Here

ChatGPT scheduled tasks should update these paths every day:

- `data/daily/YYYY-MM-DD.json`
- `reports/html/YYYY-MM-DD.html`
- `data/manifest.json`

The expected manifest shape is:

```json
{
  "latest": "2026-07-03",
  "days": [
    {
      "date": "2026-07-03",
      "file": "data/daily/2026-07-03.json",
      "html": "reports/html/2026-07-03.html"
    }
  ]
}
```

Do not add a `pdf` field to `data/manifest.json`.

## Daily JSON Shape

Each daily JSON file should follow this structure:

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.2",
  "title": "AI Opportunity Radar",
  "theme": "今日主题",
  "market_score": 8.8,
  "today_mission": "今天最重要的行动",
  "summary": ["摘要1", "摘要2", "摘要3"],
  "projects": [
    {
      "id": "project-slug",
      "rank": 1,
      "name": "Project Name",
      "category": ["Agent", "GitHub"],
      "score": 9.0,
      "github": "https://github.com/example/project",
      "website": "",
      "docs": "",
      "why_today": "为什么今天值得关注",
      "core_data": ["Stars: ...", "Forks: ...", "Updated: ..."],
      "use_cases": ["真实使用案例1", "真实使用案例2"],
      "business_model": ["SaaS", "API", "Enterprise"],
      "china_competitors": "国内竞品或替代方案",
      "fit": {
        "Opportunity Radar": 5,
        "AI Video": 4,
        "Photography": 3,
        "Vibe Coding": 4
      },
      "today_action": "今天具体应该做什么"
    }
  ]
}
```

## Dashboard

The Dashboard is fully static:

- `index.html`
- `assets/style.css`
- `assets/app.js`

It reads report data directly from the repository and supports:

- today’s report
- historical reports
- project library
- project appearance count
- first seen date
- latest seen date
- category filtering
- search
- local status labels: favorite, testing, done, dropped

Status labels are stored in the browser's `localStorage`. They are not written back to GitHub.

## Report HTML

Daily reports are stored here:

```text
reports/html/YYYY-MM-DD.html
```

These HTML files are the official daily reports. They should use the V1 visual structure:

- Cover
- Executive Summary
- 5 ranked project pages
- Daily Tool
- Daily Video
- Daily Reading
- Tomorrow Watchlist
- Today’s Mission

Recommended style: black/white/gray with a small amount of blue emphasis, similar to Linear / Notion / Apple Keynote.

## GitHub Pages

GitHub Pages should be configured as:

- Source: Deploy from branch
- Branch: `main`
- Folder: `/root`

Dashboard URL:

```text
https://paxora.github.io/ai-opportunity-radar-data/
```

## Scope

This repository does not call the OpenAI API.

ChatGPT scheduled tasks perform collection, judgment, and report generation. Codex only sets up and maintains repository infrastructure when needed.

The current production flow is:

```text
ChatGPT scheduled task
↓
Generate daily JSON + report HTML
↓
Write to GitHub repository
↓
Dashboard reads manifest + daily JSON
↓
User opens the report from Dashboard
```
