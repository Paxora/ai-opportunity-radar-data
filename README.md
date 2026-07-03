# Open-source AI Opportunity Project Radar Data

<p>
  <a href="./README.md"><strong>English</strong></a>
  ·
  <a href="./README.zh-CN.md">简体中文</a>
</p>

This repository is the data warehouse and static dashboard for **Open-source AI Opportunity Project Radar**.

The radar has one clear scope:

```text
Collection source: GitHub only
Evaluation standard: V1.4 GitHub / open-source project standard
```

## What this repository does

1. Stores daily GitHub-only radar reports.
2. Stores lightweight JSON data for the static dashboard.
3. Hosts the dashboard through GitHub Pages.

## Daily artifacts

The system keeps two daily artifacts:

- Dashboard JSON: `data/daily/YYYY-MM-DD.json`
- Report page: `reports/html/YYYY-MM-DD.html`

## Source policy

The only collection source is GitHub.

Allowed GitHub sources include:

- GitHub repository search
- GitHub repository metadata
- GitHub README files
- GitHub releases
- GitHub issues / pull requests when useful
- GitHub stars / forks / recent activity
- GitHub demo links or documentation links found inside repository metadata or README files

External links found inside a GitHub repository can be recorded as supporting context, but they do not change the collection source. The candidate must originate from GitHub.

## V1.4: GitHub / Open-source Project Standard

V1.4 is the only active evaluation standard.

Its goal is not to summarize AI news. Its goal is to identify open-source AI projects that are worth watching, testing, cloning, assigning to Codex, or turning into a practical workflow.

### Scope

V1.4 applies to:

- Open-source AI projects
- MCP tools
- Agent frameworks
- ComfyUI plugins / workflows
- Open-source video or image models
- Automation-tool repositories
- Vibe Coding / Codex-related tools
- Tools that can improve the radar itself

### Candidate data to collect

Each GitHub candidate should collect as many of these fields as possible:

- `stars`
- `forks`
- `star_growth` when reliable; if not reliable, state that it is unavailable
- `last_updated`
- `archived`
- `recent_activity`
- releases
- issues / pull requests
- README quality
- demo / website / screenshots / sample videos
- documentation quality
- relevance to AI video, photography, content production, Vibe Coding, Codex, MCP, Agent workflows, or the radar system itself

### Top selection requirements

A GitHub item can enter the Top list only when it has:

1. At least 2 hard data signals.
2. At least 1 personal relevance signal.
3. At least 1 clear 15-30 minute `today_action`.

### Scoring model

| Dimension | Weight | Meaning |
| --- | ---: | --- |
| `data_score` | 20% | stars, forks, star growth, community attention |
| `activity_score` | 20% | recent updates, commits, releases, issues / PRs |
| `personal_fit_score` | 25% | relevance to AI video, photography, content production, radar, Vibe Coding |
| `business_score` | 20% | potential to become SaaS, template, service, workflow, content product, or vertical solution |
| `action_score` | 15% | whether there is a concrete action that can be done today |

Items below 8.0 should not enter the Top list.

Items without a clear `today_action` should not enter the Top list.

## Daily JSON shape

Each daily JSON file should use V1.4:

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.4",
  "title": "Open-source AI Opportunity Project Radar",
  "theme": "Daily GitHub open-source opportunity signals",
  "market_score": 8.6,
  "today_mission": "The most useful action today",
  "summary": [],
  "projects": [],
  "rejected_candidates": []
}
```

### Project item fields

Recommended fields for each project:

```json
{
  "id": "project-id",
  "rank": 1,
  "name": "Project name",
  "source_type": "github_open_source",
  "category": [],
  "score": 8.8,
  "scores": {
    "data_score": 0,
    "activity_score": 0,
    "personal_fit_score": 0,
    "business_score": 0,
    "action_score": 0
  },
  "github": "https://github.com/owner/repo",
  "why_today": "Why this GitHub project matters today",
  "evidence": [],
  "opportunity": "What opportunity it suggests",
  "risk": "Main risk or limitation",
  "today_action": "What to do in 15-30 minutes",
  "action_type": "test / clone / inspect / assign_to_codex / watch",
  "timebox": "15-30 minutes"
}
```

## Files updated by the scheduled task

The scheduled task should update:

```text
data/daily/YYYY-MM-DD.json
reports/html/YYYY-MM-DD.html
data/manifest.json
```

## Dashboard

The dashboard is fully static:

- `index.html`
- `assets/style.css`
- `assets/app.js`

Dashboard URL:

```text
https://paxora.github.io/ai-opportunity-radar-data/
```

## Current production flow

```text
ChatGPT scheduled task
↓
Collect GitHub candidates only
↓
Evaluate candidates with V1.4
↓
Generate Top GitHub / open-source projects + rejected candidates
↓
Write daily JSON and HTML report
↓
Update manifest
↓
Dashboard reads manifest + daily JSON
```
