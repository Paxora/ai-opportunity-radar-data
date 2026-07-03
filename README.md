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

The HTML file is the official daily report, and the UI should call it **日报**.

## V1.4 Content Selection Rules

V1.4 is not an AI news summary. It is designed to select AI projects, tools, products, and open-source repositories that are worth watching, testing, or turning into an opportunity today.

Core principle:

```text
hard data signals + personal relevance + today action value
```

Each run should first collect at least 15-20 candidates, then filter them down to Top 5. Top 5 is ranked by opportunity score, not by stars alone.

### Scope

Priority areas:

- AI video / image-to-video / text-to-video / digital human / avatar
- ComfyUI / AIGC workflow / creative automation
- content production, imaging workflow, photo/video productivity tools
- AI Agent / MCP / Browser Agent / automation
- AI Coding / Vibe Coding / Codex-related tools
- AI SaaS / AI App / productized workflow
- tools that improve AI Opportunity Radar itself

### Hard Data Signals

Each candidate should collect as many of the following as possible:

- `stars`: GitHub star count
- `forks`: GitHub fork count
- `star_growth`: 7-day / 30-day star growth; if unavailable, state that it could not be reliably obtained
- `last_updated`: latest update date
- `archived`: whether the repo is archived
- `recent_activity`: recent commits, releases, issues / PR activity
- `community_signal`: Product Hunt, Reddit, Hacker News, X, news, blog, or developer community signals
- `demo_signal`: demo, website, sample video, screenshot, or live experience
- `readme_quality`: whether the README clearly explains use case, installation, and examples

### Selection Threshold

Every Top 5 project must have:

1. At least 2 hard data signals, such as stars, star growth, recent updates, release, community discussion, demo, or README quality.
2. At least 1 personal relevance signal, such as AI video, photography, content production, Vibe Coding, or the radar system itself.
3. At least 1 clear action value, such as watching a demo, testing it, sending it to Codex, making a content idea, or adding it to the watchlist.

The following should not enter Top 5:

- News-only items with no action.
- Generic model, funding, or industry trend summaries.
- Items weakly related to AI video, photography, Vibe Coding, or Opportunity Radar.
- Items without a clear action recommendation for today.
- Archived, unmaintained, unclear, or non-demonstrable projects.
- Pure infrastructure projects that the user cannot use today or convert into a tool, content idea, or project opportunity.

### Star Rules

- High stars but low relevance: downrank.
- Low stars but fast growth and strong fit with AI video / photography / Vibe Coding: can be selected.
- High stars but long inactive: downrank.
- High stars but only a low-level library: exclude unless it supports the user's projects.
- Medium stars with demo, examples, and commercial use case: upweight.

### Scoring Model

Each candidate is scored from 1-5 on five dimensions:

| Dimension | Weight | Meaning |
| --- | --- | --- |
| `data_score` | 20% | stars, forks, star growth, community discussion |
| `activity_score` | 20% | latest update, commits, releases, issues / PR |
| `personal_fit_score` | 25% | fit with AI video, photography, content production, Opportunity Radar, Vibe Coding |
| `business_score` | 20% | potential to become SaaS, template, service, workflow, content product, or vertical solution |
| `action_score` | 15% | whether there is a clear 15-30 minute action today |

Projects below 8.0 should not enter Top 5. Projects without a clear `today_action` should not enter Top 5.

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

Each daily JSON file should follow the V1.4 structure:

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.4",
  "title": "AI Opportunity Radar",
  "theme": "今日主题",
  "market_score": 8.6,
  "today_mission": "今天最值得做的一件事",
  "summary": ["摘要1", "摘要2", "摘要3"],
  "projects": [
    {
      "id": "project-slug",
      "rank": 1,
      "name": "Project Name",
      "category": ["AI 视频", "工作流"],
      "score": 9.1,
      "scores": {
        "data_score": 4,
        "activity_score": 5,
        "personal_fit_score": 5,
        "business_score": 4,
        "action_score": 5
      },
      "selection_basis": {
        "stars": 12800,
        "forks": 900,
        "star_growth": "recent 30-day growth / unavailable",
        "last_updated": "YYYY-MM-DD",
        "archived": false,
        "recent_activity": "recent commits / release signal",
        "community_signal": "community discussion signal",
        "demo_signal": "demo / sample video / website / README example",
        "why_selected": "selected because it satisfies data, relevance, and action value"
      },
      "verdict": "值得今天测试",
      "one_liner": "一句话说明机会点",
      "github": "https://github.com/example/project",
      "website": "",
      "docs": "",
      "why_today": "为什么今天值得关注",
      "evidence": ["事实依据1", "事实依据2", "事实依据3"],
      "opportunity": "可能形成的具体机会",
      "risk": "潜在风险或噪音判断",
      "china_competitors": "国内竞品或替代方案",
      "fit": {
        "Opportunity Radar": 5,
        "AI Video": 4,
        "Photography": 3,
        "Vibe Coding": 4
      },
      "today_action": "今天具体应该做什么",
      "action_type": "test",
      "timebox": "20 分钟",
      "links": {
        "github": "https://github.com/example/project",
        "website": "",
        "docs": ""
      }
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

These files are the official daily reports. Recommended style: black/white/gray with a small amount of blue emphasis, similar to Linear / Notion / Apple Keynote.

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
Collect 15-20 candidate projects
↓
Filter Top 5 by V1.4 rules
↓
Generate daily JSON + report page
↓
Write to GitHub repository
↓
Dashboard reads manifest + daily JSON
↓
User opens the report from Dashboard
```
