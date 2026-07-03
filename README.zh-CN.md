# Open-source AI Opportunity Project Radar Data

<p>
  <a href="./README.md">English</a>
  ·
  <a href="./README.zh-CN.md"><strong>简体中文</strong></a>
</p>

这个仓库是 **Open-source AI Opportunity Project Radar** 的数据仓库和静态 Dashboard。

当前雷达只保留一个明确范围：

```text
采集来源：GitHub only
评价标准：V1.4 GitHub / open-source project standard
```

## 这个仓库负责什么

1. 存放每日 GitHub-only 雷达日报。
2. 存放静态 Dashboard 读取的轻量 JSON 数据。
3. 通过 GitHub Pages 托管 Dashboard。

## 每日产物

系统每天只保留两类产物：

- Dashboard JSON：`data/daily/YYYY-MM-DD.json`
- 正式日报页面：`reports/html/YYYY-MM-DD.html`

## 采集来源规则

唯一采集来源是 GitHub。

允许的 GitHub 来源包括：

- GitHub repository search
- GitHub repository metadata
- GitHub README
- GitHub releases
- GitHub issues / pull requests，如有必要
- GitHub stars / forks / recent activity
- GitHub 仓库元数据或 README 中出现的 demo / docs / website 链接

如果 GitHub 仓库里包含外部 demo、官网或文档链接，可以作为支持信息记录，但候选项目必须来源于 GitHub。

## V1.4：GitHub / 开源项目标准

V1.4 是当前唯一启用的评价标准。

它的目标不是做 AI 新闻摘要，而是筛选今天值得关注、测试、clone、交给 Codex、或变成实际工作流的开源 AI 项目。

### 适用范围

V1.4 适用于：

- 开源 AI 项目
- MCP 工具
- Agent 框架
- ComfyUI 插件 / 工作流
- 开源视频 / 图像模型
- 自动化工具开源仓库
- Vibe Coding / Codex 相关工具
- 能改进雷达系统本身的工具

### 候选项目需要采集的数据

每个 GitHub 候选尽量记录：

- `stars`
- `forks`
- `star_growth`，如果无法可靠获取，需要明确写出不可用
- `last_updated`
- `archived`
- `recent_activity`
- releases
- issues / pull requests
- README 质量
- demo / website / screenshots / sample videos
- 文档质量
- 是否贴合 AI 视频、摄影、内容生产、Vibe Coding、Codex、MCP、Agent 工作流或雷达系统本身

### Top 入选要求

GitHub 项目进入 Top 必须同时满足：

1. 至少 2 条硬数据信号。
2. 至少 1 条个人相关信号。
3. 至少 1 条明确的 15-30 分钟 `today_action`。

### 评分模型

| 维度 | 权重 | 含义 |
| --- | ---: | --- |
| `data_score` | 20% | stars、forks、star growth、社区关注 |
| `activity_score` | 20% | 最近更新、commits、releases、issues / PR |
| `personal_fit_score` | 25% | 是否贴合 AI 视频、摄影、内容生产、雷达、Vibe Coding |
| `business_score` | 20% | 是否可能变成 SaaS、模板、服务、工作流、内容产品或垂直方案 |
| `action_score` | 15% | 今天是否有具体可执行动作 |

综合分低于 8.0 的项目不进入 Top。

没有明确 `today_action` 的项目不进入 Top。

## Daily JSON 格式

每日 JSON 使用 V1.4：

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.4",
  "title": "Open-source AI Opportunity Project Radar",
  "theme": "Daily GitHub open-source opportunity signals",
  "market_score": 8.6,
  "today_mission": "今天最值得做的一件事",
  "summary": [],
  "projects": [],
  "rejected_candidates": []
}
```

### 项目字段建议

每个项目建议包含：

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
  "why_today": "为什么今天值得看",
  "evidence": [],
  "opportunity": "它暗示的机会",
  "risk": "主要风险或限制",
  "today_action": "今天 15-30 分钟做什么",
  "action_type": "test / clone / inspect / assign_to_codex / watch",
  "timebox": "15-30 minutes"
}
```

## 计划任务每天写入的文件

计划任务只需要更新：

```text
data/daily/YYYY-MM-DD.json
reports/html/YYYY-MM-DD.html
data/manifest.json
```

## Dashboard

Dashboard 是纯静态页面：

- `index.html`
- `assets/style.css`
- `assets/app.js`

Dashboard 地址：

```text
https://paxora.github.io/ai-opportunity-radar-data/
```

## 当前生产流程

```text
ChatGPT 计划任务
↓
只采集 GitHub 候选项目
↓
用 V1.4 评价候选项目
↓
生成 Top GitHub / open-source projects + rejected candidates
↓
写入每日 JSON 和 HTML 日报
↓
更新 manifest
↓
Dashboard 读取 manifest + daily JSON
```
