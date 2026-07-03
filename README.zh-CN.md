# AI Opportunity Radar Data

<p>
  <a href="./README.md">English</a>
  ·
  <a href="./README.zh-CN.md"><strong>简体中文</strong></a>
</p>

这个仓库是 **AI Opportunity Radar** 的数据仓库和静态 Dashboard。

它承担三件事：

1. **日报中转站**：ChatGPT 计划任务每天把日报数据写入这里。
2. **轻量数据库**：Dashboard 读取 `data/manifest.json` 和 `data/daily/*.json`。
3. **展示站点**：GitHub Pages 通过 `index.html` 托管 Dashboard。

## 当前设计

当前系统保留两类每日产物：

- Dashboard JSON：`data/daily/YYYY-MM-DD.json`
- 正式日报页面：`reports/html/YYYY-MM-DD.html`

`reports/html/YYYY-MM-DD.html` 就是正式日报，界面和文案统一称为 **日报**。

## V1.4 内容筛选规则

V1.4 的目标不是做 AI 新闻摘要，而是筛选 **今天值得关注、值得测试、可能形成机会** 的 AI 项目、工具、产品和开源项目。

核心原则：

```text
硬数据信号 + 个人相关性 + 今日行动价值
```

每天先收集至少 15-20 个候选项目，再筛选 Top 5。Top 5 不按 star 排，而按综合机会分排序。

### 选题范围

优先关注：

- AI 视频 / 图生视频 / 文生视频 / 数字人 / Avatar
- ComfyUI / AIGC Workflow / Creative Automation
- 内容生产、影像工作流、摄影/视频提效工具
- AI Agent / MCP / Browser Agent / 自动化
- AI Coding / Vibe Coding / Codex 相关工具
- AI SaaS / AI App / Productized Workflow
- 能帮助 AI Opportunity Radar 本身变得更好的工具

### 硬数据依据

每个候选项目尽量记录：

- `stars`：GitHub stars 总数
- `forks`：GitHub forks 总数
- `star_growth`：最近 7 天 / 30 天 star 增长；如果无法可靠获取，需要明确写出
- `last_updated`：最近更新时间
- `archived`：是否 archived
- `recent_activity`：近期提交、release、issue / PR 活跃度
- `community_signal`：Product Hunt、Reddit、Hacker News、X、新闻、博客等讨论信号
- `demo_signal`：是否有 demo、官网、示例视频、截图或可体验入口
- `readme_quality`：README 是否清楚说明用途、安装、示例

### 入选门槛

每个进入 Top 5 的项目，必须同时满足：

1. 至少 2 条硬数据信号，例如 stars、star 增长、最近更新、release、社区讨论、demo、README 清晰度。
2. 至少 1 条个人相关信号，例如 AI 视频、摄影、内容生产、Vibe Coding、机会雷达系统。
3. 至少 1 条明确行动价值，例如今天能看 demo、测试、交给 Codex、做内容选题、加入观察清单。

以下内容不进入 Top 5：

- 只有新闻价值、没有可执行动作。
- 只是泛泛介绍大模型、融资、行业趋势。
- 与 AI 视频、摄影、Vibe Coding、机会雷达方向关系弱。
- 今天无法给出明确行动建议。
- 已归档、长期不维护、README 不清楚、没有真实使用场景。
- 纯底层技术但用户今天用不上，也无法转化为工具、内容或项目机会。

### Star 判断规则

- Stars 高但跟用户无关：降权。
- Stars 低但增长快且贴合 AI 视频 / 摄影 / Vibe Coding：可以入选。
- Stars 高但长期不更新：降权。
- Stars 高但只是底层库：除非能服务用户项目，否则不入选。
- Stars 中等但有 demo、有案例、有商业使用场景：加权。

### 评分模型

每个候选项目按 5 个维度打分，每项 1-5 分：

| 维度 | 权重 | 含义 |
| --- | --- | --- |
| `data_score` | 20% | stars、forks、star 增长、社区讨论 |
| `activity_score` | 20% | 最近更新、commits、release、issues / PR |
| `personal_fit_score` | 25% | 是否贴合 AI 视频、摄影、内容生产、机会雷达、Vibe Coding |
| `business_score` | 20% | 是否可能变成 SaaS、模板、服务、工作流、内容产品或垂直行业方案 |
| `action_score` | 15% | 今天是否能给出 15-30 分钟内可执行动作 |

综合分低于 8.0 的项目不进入 Top 5。没有明确 `today_action` 的项目不进入 Top 5。

## 每天写入的文件

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

## Daily JSON 格式

每个 daily JSON 文件应遵循 V1.4 结构：

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
        "star_growth": "最近 30 天增长明显 / 未能可靠获取",
        "last_updated": "YYYY-MM-DD",
        "archived": false,
        "recent_activity": "最近 7 天有提交 / 最近 30 天有 release",
        "community_signal": "社区讨论信号",
        "demo_signal": "有 demo / 示例视频 / 官网 / README 示例",
        "why_selected": "同时满足硬数据、个人相关性和今日行动价值"
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

## 日报页面

每日报告存放在：

```text
reports/html/YYYY-MM-DD.html
```

这些文件就是正式日报。推荐风格：黑白灰为主，少量蓝色强调，类似 Linear / Notion / Apple Keynote。

## GitHub Pages

GitHub Pages 配置：

- Source: Deploy from branch
- Branch: `main`
- Folder: `/root`

Dashboard 地址：

```text
https://paxora.github.io/ai-opportunity-radar-data/
```

## 范围说明

这个仓库不调用 OpenAI API。

ChatGPT 计划任务负责采集、判断和生成日报；Codex 只在需要时维护仓库基础设施。

当前生产流程：

```text
ChatGPT 计划任务
↓
收集 15-20 个候选项目
↓
按 V1.4 规则筛选 Top 5
↓
生成日报 JSON + 日报页面
↓
写入 GitHub 仓库
↓
Dashboard 读取 manifest + daily JSON
↓
用户在 Dashboard 打开日报
```
