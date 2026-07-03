# AI Opportunity Radar Data

This repository is the data warehouse and static Dashboard for **AI Opportunity Radar**.

It has three jobs:

1. Relay station: ChatGPT scheduled tasks write daily report artifacts here.
2. Lightweight database: the Dashboard reads `data/manifest.json` and `data/daily/*.json`.
3. Public display site: GitHub Pages hosts the Dashboard from `index.html`.

## What Writes Here

ChatGPT scheduled tasks should update these paths every day:

- `data/daily/YYYY-MM-DD.json`
- `reports/html/YYYY-MM-DD.html`
- `data/manifest.json`

The expected manifest shape is:

```json
{
  "latest": "2026-07-02",
  "days": [
    {
      "date": "2026-07-02",
      "file": "data/daily/2026-07-02.json",
      "html": "reports/html/2026-07-02.html",
      "pdf": "reports/pdf/2026-07-02.pdf"
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
- PDF archive
- project library
- project appearance count
- first seen date
- latest seen date
- category filtering
- search
- local status labels: favorite, testing, done, dropped

Status labels are stored in the browser's `localStorage`. They are not written back to GitHub.

## PDF Generation

GitHub Actions watches `reports/html/*.html`.

When a new HTML report is pushed, `.github/workflows/build-pdf.yml` runs:

```bash
node scripts/html_to_pdf.mjs
```

The script converts:

```text
reports/html/YYYY-MM-DD.html
```

into:

```text
reports/pdf/YYYY-MM-DD.pdf
```

Existing PDFs are skipped to avoid duplicate work.

## GitHub Pages

GitHub Pages should be configured as:

- Source: Deploy from branch
- Branch: `main`
- Folder: `/root`

The Dashboard URL will look like:

```text
https://YOUR_GITHUB_USERNAME.github.io/ai-opportunity-radar-data/
```

## Scope

This repository does not call the OpenAI API.

Codex does not perform collection, analysis, or report generation here. Codex only sets up the repository infrastructure, Dashboard, file structure, GitHub Actions workflow, and GitHub Pages configuration.
