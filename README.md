# Open-source AI Opportunity

<p>
  <a href="./README.md"><strong>English</strong></a>
  ·
  <a href="./README.zh-CN.md">简体中文</a>
</p>

This repository is the data warehouse and static dashboard for **Open-source AI Opportunity**.

## Core principle

```text
This is not a tool leaderboard.
This is not a GitHub stars leaderboard.
The system extracts valuable opportunity schemes from tools, projects, workflows, and signals.
```

A tool does not enter the Top list by itself. It can only enter the Top list after it is converted into:

```text
tool / project + concrete scenario + workflow + minimum test + opportunity judgment
```

Example:

```text
Do not recommend: n8n
Recommend: n8n: AI opportunity signal collection workflow

Do not recommend: ComfyUI
Recommend: ComfyUI: reusable commercial visual workflow template analysis
```

## What this repository does

1. Stores daily value-first opportunity reports.
2. Stores lightweight JSON data for the static dashboard.
3. Hosts the dashboard through GitHub Pages.

## Daily artifacts

- Dashboard JSON: `data/daily/YYYY-MM-DD.json`
- Report page: `reports/html/YYYY-MM-DD.html`

## Source policy

GitHub remains the primary source, but GitHub is only the signal layer, not the final value layer.

Primary sources:

- GitHub repository search
- GitHub repository metadata
- GitHub README / docs / examples / workflows
- GitHub releases
- GitHub issues / pull requests when useful
- GitHub stars / forks / recent activity

Supporting sources can be used to judge real value:

- Official docs or websites linked from GitHub
- Demo pages
- YouTube / bilibili usage cases
- X / Reddit discussions
- Product Hunt
- Public workflow / template examples

Supporting sources help answer: does this tool have a real scenario, workflow, and repeatable value?

## V1.5: Value-first Opportunity Standard

V1.5 is the active evaluation standard.

The goal is not to summarize AI news or rank popular open-source projects. The goal is to identify valuable opportunity schemes that can be tested, studied, automated, productized, or turned into reusable workflows.

## Collection objects

The system can collect:

- GitHub projects
- AI tools
- automation tools
- workflows
- templates
- reusable processes
- concrete use cases
- opportunity signals
- system-improvement ideas

But the final Top list must be opportunity schemes, not raw tools.

## Screening flow

### Step 1: Find signals

Collect candidates with signals:

- stars / forks
- recent updates
- releases
- README quality
- docs / examples
- demo / screenshots / sample videos
- public workflow files
- real usage cases
- community discussion

### Step 2: Judge value

Every candidate must answer:

- Is it only a tool, or can it carry a concrete scheme?
- What real problem does it solve?
- Does it have a workflow?
- Does it help make a decision, save time, or reveal an opportunity?
- If a mainstream closed-source tool is stronger, what is the unique value of this open-source/tooling option?

If the only conclusion is "this tool is popular" or "this framework is strong", it does not enter the Top list.

### Step 3: Convert into a scheme

Every Top item must be converted into:

```text
tool + scenario + workflow + minimum test + opportunity judgment
```

## Top selection requirements

A Top item must have:

1. A clear value judgment.
2. A concrete landing scenario.
3. A workflow that can be described as input → process → output.
4. A 15-30 minute minimum validation action.
5. Supporting signals from GitHub, docs, workflow examples, usage cases, or community discussion.

## Scoring model

| Dimension | Weight | Meaning |
| --- | ---: | --- |
| `value_insight_score` | 35% | whether it extracts a valuable opportunity judgment |
| `practical_workflow_score` | 25% | whether it can become a concrete landing workflow |
| `direction_fit_score` | 20% | whether it fits the user's interests, profession, projects, or system-building needs |
| `signal_score` | 10% | GitHub heat, updates, README quality, cases, discussions |
| `today_action_score` | 10% | whether it can be validated in 15-30 minutes today |

Ranking principle:

```text
valuable > actionable > relevant > signaled > popular
```

Not:

```text
popular > famous > technically impressive
```

## Recommended daily JSON shape

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.5-value-first",
  "title": "Open-source AI Opportunity",
  "theme": "Value-first opportunity schemes",
  "market_score": 8.6,
  "today_mission": "The most useful action today",
  "summary": [],
  "projects": [],
  "rejected_candidates": []
}
```

## Top item fields

```json
{
  "id": "scheme-id",
  "rank": 1,
  "name": "n8n: AI opportunity signal collection workflow",
  "source_project": "n8n",
  "source_type": "github_open_source",
  "category": [],
  "score": 8.8,
  "scores": {
    "value_insight_score": 0,
    "practical_workflow_score": 0,
    "direction_fit_score": 0,
    "signal_score": 0,
    "today_action_score": 0
  },
  "github": "https://github.com/owner/repo",
  "value_insight": "The value judgment behind the scheme",
  "problem_solved": "What real problem it solves",
  "workflow": {
    "input": "What goes in",
    "process": "How it is processed",
    "output": "What comes out"
  },
  "mainstream_comparison": "How it compares with mainstream alternatives",
  "today_action": "What to do in 15-30 minutes",
  "success_criteria": [],
  "next_opportunity": "What it can become if validated"
}
```

## Rejection rules

Reject candidates that only have:

- tool introduction, but no scheme
- GitHub heat, but no value judgment
- technical concept, but no scenario
- demo, but no reusable workflow
- resource list, but no validation action
- weaker-than-mainstream tool, but no unique value explanation
- no relevance to the user's work, interests, projects, or system-building needs

## Production flow

```text
ChatGPT scheduled task
↓
Collect GitHub-first signals
↓
Use supporting sources to judge real usage value
↓
Convert tools/projects into opportunity schemes
↓
Reject raw tool recommendations
↓
Write daily JSON and HTML report
↓
Update manifest
↓
Dashboard reads manifest + daily JSON
```

Dashboard URL:

```text
https://paxora.github.io/ai-opportunity-radar-data/
```
