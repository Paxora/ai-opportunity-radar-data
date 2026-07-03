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

当前系统只保留两类每日产物：

- Dashboard JSON：`data/daily/YYYY-MM-DD.json`
- 正式日报页面：`reports/html/YYYY-MM-DD.html`

PDF 流程已经移除。`reports/html/YYYY-MM-DD.html` 就是正式日报，界面和文案统一称为 **日报**，不再称为 **HTML 日报**。

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

不要在 `manifest.json` 里添加 `pdf` 字段。

## Daily JSON 格式

每个 daily JSON 文件应遵循以下结构：

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

这些 HTML 文件就是正式日报，应使用 V1 视觉结构：

- 封面
- Executive Summary
- 5 个按重要性排序的项目页
- Daily Tool
- Daily Video
- Daily Reading
- Tomorrow Watchlist
- Today’s Mission

推荐风格：黑白灰为主，少量蓝色强调，类似 Linear / Notion / Apple Keynote。

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
生成日报 JSON + 日报 HTML
↓
写入 GitHub 仓库
↓
Dashboard 读取 manifest + daily JSON
↓
用户在 Dashboard 打开日报
```
