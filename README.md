# AI Opportunity Radar Data

<p>
  <a href="./README.md"><strong>English</strong></a>
  ·
  <a href="./README.zh-CN.md">简体中文</a>
</p>

This repository is the data warehouse and static Dashboard for **AI Opportunity Radar**.

It has three jobs:

1. Relay station: ChatGPT scheduled tasks write daily report data here.
2. Lightweight database: the Dashboard reads `data/manifest.json` and `data/daily/*.json`.
3. Public display site: GitHub Pages hosts the Dashboard from `index.html`.

## Current Design

The system keeps two daily artifacts:

- Dashboard JSON: `data/daily/YYYY-MM-DD.json`
- Report page: `reports/html/YYYY-MM-DD.html`

The HTML file is the official daily report, and the UI should call it **日报** rather than **HTML 日报**.

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

- today's report
- historical reports
- project library
- project appearance count
- first seen date
- latest seen date
- category filtering
- search
- local status labels: favorite, testing, done, dropped

Status labels are stored in the browser's `localStorage`. They are not written back to GitHub.

## Report Page

Daily reports are stored here:

```text
reports/html/YYYY-MM-DD.html
```

These files are the official daily reports. They should use the V1 visual structure:

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
Generate daily JSON + report page
↓
Write to GitHub repository
↓
Dashboard reads manifest + daily JSON
↓
User opens the report from Dashboard
```
