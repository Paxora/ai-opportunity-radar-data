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

It also keeps one long-term tracking file:

- Non-GitHub watchlist: `data/watchlist.json`

The HTML file is the official daily report, and the UI should call it **日报**.

## Content Rules Overview

The system now uses two tracks:

```text
V1.4: GitHub / open-source signal standard
V1.5: Non-GitHub product, platform, and creator-tool signal standard
```

V1.5 does not replace V1.4. GitHub and open-source items still use V1.4. Non-GitHub products and platforms such as Seedance, TapNow, Liblib.TV, Coze, Dify, and n8n use V1.5.

## V1.4: GitHub / Open-source Standard

V1.4 is not an AI news summary. It selects open-source projects and GitHub repositories that are worth watching, testing, or turning into an opportunity today.

Core principle:

```text
hard data signals + personal relevance + today action value
```

Scope:

- open-source projects
- MCP tools
- Agent frameworks
- ComfyUI plugins / workflows
- open-source video models
- automation-tool repositories
- Vibe Coding / Codex-related tools

Each candidate should collect as many of these as possible:

- `stars`: GitHub star count
- `forks`: GitHub fork count
- `star_growth`: 7-day / 30-day star growth; state clearly if unavailable
- `last_updated`: latest update date
- `archived`: whether the repo is archived
- `recent_activity`: recent commits, releases, issues / PR activity
- `community_signal`: Product Hunt, Reddit, Hacker News, X, or developer community signals
- `demo_signal`: demo, website, sample video, screenshot, or live experience
- `readme_quality`: whether the README clearly explains use case, installation, and examples

Every Top 5 GitHub item must have:

1. At least 2 hard data signals.
2. At least 1 personal relevance signal, such as AI video, photography, content production, Vibe Coding, or Opportunity Radar.
3. At least 1 clear action value, such as watching a demo, testing it, sending it to Codex, making a content idea, or adding it to the watchlist.

Scoring model:

| Dimension | Weight | Meaning |
| --- | --- | --- |
| `data_score` | 20% | stars, forks, star growth, community discussion |
| `activity_score` | 20% | latest update, commits, releases, issues / PR |
| `personal_fit_score` | 25% | fit with AI video, photography, content production, Opportunity Radar, Vibe Coding |
| `business_score` | 20% | potential to become SaaS, template, service, workflow, content product, or vertical solution |
| `action_score` | 15% | whether there is a clear 15-30 minute action today |

Projects below 8.0 should not enter Top 5. Projects without a clear `today_action` should not enter Top 5.

## V1.5: Non-GitHub Product & Creator-tool Standard

V1.5 is dedicated to discovering and judging valuable non-GitHub signals.

Scope:

- AI video products: Seedance, Kling, Jimeng, Vidu, PixVerse, Runway, Pika, Veo, Sora, Luma, Hailuo, etc.
- AIGC creation platforms: TapNow, Liblib.TV, TusiArt, Krea, Civitai, OpenArt, Midjourney, Ideogram, Recraft, Canva, Firefly, etc.
- Agent / automation platforms: Coze, Dify, n8n, FastGPT, Flowise, Langflow, Activepieces, Zapier, Make, Gumloop, etc.
- Creator tools / workflows: infinite canvas, image-to-image, inpainting, outpainting, poster generation, storyboarding, AI photography, AI short-video workflows

V1.5 core flow:

```text
candidate discovery → type detection → multi-source verification → type-specific scoring → Top / observation / rejected
```

### Candidate Discovery

Each daily run should first check:

1. Fixed entities in `data/watchlist.json`.
2. Official sources: websites, announcements, product updates, official accounts.
3. Creator sources: real cases and tutorials from Bilibili, Douyin, Xiaohongshu, YouTube, and X.
4. Community sources: Product Hunt, Reddit, Discord, comments, and tool communities.

News is background only. It must not be used as a core selection signal.

### Multi-source Verification

A non-GitHub candidate needs at least 2 evidence types before it can enter Top 5.

The four evidence types are:

| Evidence type | Meaning |
| --- | --- |
| `official` | official website, announcement, changelog, official account, product entry |
| `creator` | Bilibili, Douyin, Xiaohongshu, YouTube cases, tutorials, creator work streams |
| `community` | X, Reddit, Product Hunt, Discord, comment discussion |
| `technical` | Hugging Face, ModelScope, arXiv, Papers with Code, public model or technical docs |

Selection rule:

```text
1 evidence type: observation only
2 evidence types: candidate pool
3+ evidence types: can compete for Top 5
```

### Type-specific Scoring

Use different standards for different types:

- **AI video product**: recent 30-90 day signal, official product entry, real cases, fit with photography/video/ads/short films, and whether it can be tested today.
- **AIGC creation platform**: infinite canvas, image-to-image, inpainting, outpainting, templates, workflows, model marketplace, creator cases, and commercial visual use cases.
- **Agent / automation platform**: agent builder, workflow builder, source connection, non-programmer usability, Opportunity Radar usefulness, and whether it can be turned into an MVP with Codex.
- **Creator case**: whether the result is real, the workflow is reusable, it fits shooting/content production, and it can become a content idea, service, or client case.

## Watchlist

`data/watchlist.json` is the fixed tracking list for non-GitHub content.

It includes at least:

- AI video products
- AIGC creation platforms
- Agent / automation platforms
- Radar-related tools

When the user points out a missed item, add it to the Watchlist first, then track it with V1.5 rules instead of relying on one-off search.

## What Writes Here

ChatGPT scheduled tasks should update these paths every day:

```text
data/daily/YYYY-MM-DD.json
reports/html/YYYY-MM-DD.html
data/manifest.json
```

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

Each daily JSON file should support the two-track structure:

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.5",
  "title": "AI Opportunity Radar",
  "theme": "今日主题",
  "market_score": 8.6,
  "today_mission": "今天最值得做的一件事",
  "summary": ["摘要1", "摘要2", "摘要3"],
  "projects": [],
  "watchlist_observations": [],
  "rejected_candidates": []
}
```

Meaning:

- `projects`: today's Top items. GitHub items use V1.4; non-GitHub items use V1.5.
- `watchlist_observations`: items with signals but not enough evidence or action value.
- `rejected_candidates`: discovered but rejected items, with reasons.

Recommended fields for non-GitHub items:

```json
{
  "source_type": "aigc_creation_platform",
  "evidence_pack": {
    "official": "official evidence",
    "creator": "creator evidence",
    "community": "community evidence",
    "technical": "technical evidence if applicable",
    "evidence_count": 2,
    "confidence": "A / B / C"
  },
  "selection_basis": {
    "why_now": "why it matters today",
    "product_signal": "product capability or update",
    "creator_signal": "creator cases or tutorials",
    "personal_fit": "fit with photography/video/content production/automation",
    "today_action_value": "what can be done in 15-30 minutes today"
  }
}
```

## Dashboard

The Dashboard is fully static:

- `index.html`
- `assets/style.css`
- `assets/app.js`

It supports:

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
Read data/watchlist.json
↓
Evaluate GitHub / open-source candidates with V1.4
↓
Evaluate non-GitHub products / platforms / creator tools with V1.5
↓
Generate Top items + observations + rejected candidates
↓
Generate daily JSON + report page
↓
Write to GitHub repository
↓
Dashboard reads manifest + daily JSON
↓
User opens the report from Dashboard
```
