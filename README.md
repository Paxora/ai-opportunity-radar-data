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

Long-term tracking file:

- Non-GitHub watchlist: `data/watchlist.json`

## Content Rules Overview

The system uses two tracks:

```text
V1.4: GitHub / open-source signal standard
V1.5.1: non-GitHub product, platform, creator-tool, and ecosystem-chain signal standard
```

V1.5.1 does not replace V1.4. GitHub and open-source items still use V1.4. Non-GitHub products and platforms use V1.5.1.

## V1.4: GitHub / Open-source Standard

Scope:

- open-source projects
- MCP tools
- Agent frameworks
- ComfyUI plugins / workflows
- open-source video models
- automation-tool repositories
- Vibe Coding / Codex-related tools

Each GitHub candidate should collect as many of these as possible:

- `stars`, `forks`, `star_growth`
- `last_updated`, `archived`
- `recent_activity`, releases, issues / PRs
- `readme_quality`
- demo / website / sample video
- fit with AI video, photography, content production, Vibe Coding, or Opportunity Radar

A Top GitHub item must have:

1. At least 2 hard data signals.
2. At least 1 personal relevance signal.
3. At least 1 clear 15-30 minute `today_action`.

## V1.5.1: Non-GitHub & Ecosystem-chain Standard

V1.5.1 covers non-GitHub content:

- AI video products: Seedance, Kling, Jimeng, Vidu, PixVerse, Runway, Pika, Veo, Sora, Luma, Hailuo, etc.
- AIGC creation platforms: TapNow, Liblib.TV / LibTV, TusiArt, Krea, Civitai, OpenArt, Midjourney, Ideogram, Recraft, Canva, Firefly, etc.
- Agent / automation platforms: Coze, Dify, n8n, FastGPT, Flowise, Langflow, Activepieces, Zapier, Make, Gumloop, etc.
- Creator tools / workflows: infinite canvas, image-to-image, inpainting, outpainting, poster generation, storyboarding, AI photography, AI short-video workflows

Core flow:

```text
candidate discovery → type detection → multi-source verification → upstream/downstream merge → type-specific scoring → Top / observation / rejected
```

## V1.5.1 Hard Rules

### 1. Top must keep GitHub

Each daily Top list must include:

```text
at least 2 GitHub / open-source items
```

If fewer than 2 qualified GitHub items are included, explain why in `rejected_candidates`.

### 2. Well-known products cannot enter just because they are famous

Seedance, n8n, Coze, Dify, Krea, Runway, Sora, and similar large products cannot enter Top only because they are strong.

They need a concrete new signal:

- new wrapper
- new workflow
- new creator case
- new technical release
- new open-source repository
- new product entry
- new directly testable path

### 3. Merge upstream/downstream duplicates

If multiple items refer to the same capability chain, merge them.

Example:

```text
Seedance 2.0 = base model / capability source
LibTV / Dreamina / Doubao / Krea / ComfyUI Seedance Node = product or workflow wrappers
creator cases = real-use validation
```

Do not write them as unrelated opportunities. Write them as:

```text
Seedance ecosystem chain: base model → product wrapper → workflow → action today
```

### 4. Every Top item needs depth

Every Top item must answer:

1. What is non-obvious beyond common knowledge?
2. What is the new signal today?
3. How does it relate to photography / video / content production / Opportunity Radar?
4. What are its upstream/downstream relationships?
5. What exactly can be tested in 15-30 minutes today?

If these cannot be answered, it should not enter Top.

### 5. Do not force Top 5

Prefer 3-4 high-quality items over filling the list with weak candidates.

## Multi-source Verification

A non-GitHub candidate needs at least 2 evidence types before it can enter Top.

| Evidence type | Meaning |
| --- | --- |
| `official` | official website, announcement, changelog, official account, product entry |
| `creator` | Bilibili, Douyin, Xiaohongshu, YouTube cases, tutorials, creator work streams |
| `community` | X, Reddit, Product Hunt, Discord, comment discussion |
| `technical` | GitHub, Hugging Face, ModelScope, arXiv, Papers with Code, public model or technical docs |

News is background only. It must not be used as a core selection signal.

## Watchlist

`data/watchlist.json` is the fixed tracking list for non-GitHub content.

When the user points out a missed item, add it to the Watchlist first, then track it with V1.5.1 rules.

## Daily JSON Shape

Each daily JSON file should support:

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.5.1",
  "title": "AI Opportunity Radar",
  "theme": "今日主题",
  "market_score": 8.6,
  "today_mission": "今天最值得做的一件事",
  "summary": [],
  "projects": [],
  "ecosystem_chains": [],
  "watchlist_observations": [],
  "rejected_candidates": []
}
```

Field meaning:

- `projects`: today's Top items. GitHub items use V1.4; non-GitHub items use V1.5.1.
- `ecosystem_chains`: upstream/downstream opportunity chains, for example Seedance → LibTV / Krea / ComfyUI → creator case → action today.
- `watchlist_observations`: items with signals but not enough evidence or action value.
- `rejected_candidates`: discovered but rejected items, with reasons.

Recommended Top item fields:

```json
{
  "source_type": "github_open_source / aigc_creation_platform / ecosystem_chain",
  "non_obvious_signal": "what is not common knowledge",
  "relation": {
    "base_model": "base model if applicable",
    "product_wrapper": "product entry if applicable",
    "workflow_layer": "workflow layer if applicable",
    "creator_case": "case layer if applicable"
  },
  "evidence_pack": {
    "official": "official evidence",
    "creator": "creator evidence",
    "community": "community evidence",
    "technical": "technical evidence",
    "evidence_count": 2,
    "confidence": "A / B / C"
  },
  "today_action": "what to do in 15-30 minutes"
}
```

## What Writes Here

ChatGPT scheduled tasks should update these paths every day:

```text
data/daily/YYYY-MM-DD.json
reports/html/YYYY-MM-DD.html
data/manifest.json
```

## Dashboard

The Dashboard is fully static:

- `index.html`
- `assets/style.css`
- `assets/app.js`

Dashboard URL:

```text
https://paxora.github.io/ai-opportunity-radar-data/
```

## Scope

This repository does not call the OpenAI API.

ChatGPT scheduled tasks perform collection, judgment, and report generation. Codex only sets up and maintains repository infrastructure when needed.

Current production flow:

```text
ChatGPT scheduled task
↓
Read data/watchlist.json
↓
Evaluate GitHub / open-source candidates with V1.4
↓
Evaluate non-GitHub products / platforms / creator tools with V1.5.1
↓
Merge upstream/downstream ecosystem chains
↓
Generate Top items + ecosystem chains + observations + rejected candidates
↓
Generate daily JSON + report page
↓
Write to GitHub repository
↓
Dashboard reads manifest + daily JSON
```
