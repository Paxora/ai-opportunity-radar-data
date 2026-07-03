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

新增一个长期追踪文件：

- 非 GitHub Watchlist：`data/watchlist.json`

`reports/html/YYYY-MM-DD.html` 就是正式日报，界面和文案统一称为 **日报**。

## 内容规则总览

系统采用双轨规则：

```text
V1.4：GitHub / 开源项目信号标准
V1.5：GitHub 以外的产品、平台、创作者工具信号标准
```

V1.4 不被 V1.5 替代。GitHub / 开源内容继续按 V1.4 判断；Seedance、TapNow、Liblib.TV、Coze、Dify、n8n 这类非 GitHub 产品和平台，按 V1.5 判断。

## V1.4：GitHub / 开源项目标准

V1.4 的目标不是做 AI 新闻摘要，而是筛选 **今天值得关注、值得测试、可能形成机会** 的开源项目和 GitHub 项目。

核心原则：

```text
硬数据信号 + 个人相关性 + 今日行动价值
```

适用范围：

- 开源项目
- MCP 工具
- Agent 框架
- ComfyUI 插件 / 工作流
- 开源视频模型
- 自动化工具开源仓库
- Vibe Coding / Codex 相关工具

每个候选项目尽量记录：

- `stars`：GitHub stars 总数
- `forks`：GitHub forks 总数
- `star_growth`：最近 7 天 / 30 天 star 增长；如果无法可靠获取，需要明确写出
- `last_updated`：最近更新时间
- `archived`：是否 archived
- `recent_activity`：近期提交、release、issue / PR 活跃度
- `community_signal`：Product Hunt、Reddit、Hacker News、X、开发者社区等讨论信号
- `demo_signal`：是否有 demo、官网、示例视频、截图或可体验入口
- `readme_quality`：README 是否清楚说明用途、安装、示例

进入 Top 5 必须同时满足：

1. 至少 2 条硬数据信号。
2. 至少 1 条个人相关信号，例如 AI 视频、摄影、内容生产、Vibe Coding、机会雷达系统。
3. 至少 1 条明确行动价值，例如今天能看 demo、测试、交给 Codex、做内容选题、加入观察清单。

评分模型：

| 维度 | 权重 | 含义 |
| --- | --- | --- |
| `data_score` | 20% | stars、forks、star 增长、社区讨论 |
| `activity_score` | 20% | 最近更新、commits、release、issues / PR |
| `personal_fit_score` | 25% | 是否贴合 AI 视频、摄影、内容生产、机会雷达、Vibe Coding |
| `business_score` | 20% | 是否可能变成 SaaS、模板、服务、工作流、内容产品或垂直行业方案 |
| `action_score` | 15% | 今天是否能给出 15-30 分钟内可执行动作 |

综合分低于 8.0 的项目不进入 Top 5。没有明确 `today_action` 的项目不进入 Top 5。

## V1.5：非 GitHub 产品与创作者工具标准

V1.5 专门解决 GitHub 以外内容的发现和判断。

适用范围：

- AI 视频产品：Seedance、可灵、即梦、Vidu、PixVerse、Runway、Pika、Veo、Sora、Luma、Hailuo 等
- AIGC 创作平台：TapNow、Liblib.TV、吐司、Krea、Civitai、OpenArt、Midjourney、Ideogram、Recraft、Canva、Firefly 等
- Agent / 自动化平台：Coze、Dify、n8n、FastGPT、Flowise、Langflow、Activepieces、Zapier、Make、Gumloop 等
- 创作者工具 / 工作流：无限画布、图生图、局部重绘、扩图、海报生成、分镜、AI 摄影、AI 短视频工作流

V1.5 核心机制：

```text
候选发现 → 类型识别 → 多源验证 → 按类型评分 → Top / 观察 / 淘汰
```

### 候选发现

每天优先检查：

1. `data/watchlist.json` 里的固定追踪对象。
2. 官方源：官网、官方公告、产品更新、官方账号。
3. 创作者源：B站、抖音、小红书、YouTube、X 上的真实案例和教程。
4. 社区源：Product Hunt、Reddit、Discord、评论区、工具社区。

新闻源不作为核心证据，只能作为背景参考。

### 多源验证

非 GitHub 候选至少要有 2 类证据，才允许进入 Top 5。

保留 4 类证据：

| 证据类型 | 说明 |
| --- | --- |
| `official` 官方证据 | 官网、官方公告、changelog、官方账号、产品入口 |
| `creator` 创作者证据 | B站、抖音、小红书、YouTube、案例视频、教程、作品流 |
| `community` 社区证据 | X、Reddit、Product Hunt、Discord、评论区讨论 |
| `technical` 技术证据 | Hugging Face、ModelScope、arXiv、Papers with Code、公开模型或技术文档 |

判断规则：

```text
只有 1 类证据：进入观察池
有 2 类证据：可以进入候选池
有 3 类以上证据：可以竞争 Top 5
```

### 按类型评分

不同类型使用不同标准：

- **AI 视频产品**：看最近 30-90 天是否有新信号、是否有官方入口、是否有真实案例、是否适合摄影/视频/广告/短片、今天能不能测试。
- **AIGC 创作平台**：看是否有无限画布、图生图、局部重绘、扩图、模板、工作流、模型广场、创作者案例、商业视觉场景。
- **Agent / 自动化平台**：看是否能搭 Agent、搭工作流、连接信息源、适合非程序员使用、服务 Opportunity Radar、交给 Codex 做 MVP。
- **创作者案例**：看效果是否真实、流程是否可复用、是否适合拍摄/内容生产、能否变成选题、服务或客户案例。

## Watchlist

`data/watchlist.json` 是非 GitHub 内容的固定追踪名单。

它至少包含：

- AI 视频产品
- AIGC 创作平台
- Agent / 自动化平台
- 雷达相关工具

以后用户指出漏项时，先加入 Watchlist，再按 V1.5 规则长期追踪，而不是靠临时搜索。

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

每个 daily JSON 文件应支持双轨结构：

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

说明：

- `projects`：今日 Top 项目。GitHub 项目按 V1.4，非 GitHub 项目按 V1.5。
- `watchlist_observations`：发现了信号，但证据不足或今天行动价值不够的观察项。
- `rejected_candidates`：发现了但未入选，并说明原因。

非 GitHub 项目建议包含：

```json
{
  "source_type": "aigc_creation_platform",
  "evidence_pack": {
    "official": "官方证据",
    "creator": "创作者证据",
    "community": "社区证据",
    "technical": "技术证据，如果适用",
    "evidence_count": 2,
    "confidence": "A / B / C"
  },
  "selection_basis": {
    "why_now": "为什么今天值得看",
    "product_signal": "产品能力或更新",
    "creator_signal": "创作者案例或教程",
    "personal_fit": "与你的摄影/视频/内容生产/自动化方向的关系",
    "today_action_value": "今天 15-30 分钟能做什么"
  }
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
读取 data/watchlist.json
↓
GitHub / 开源候选按 V1.4 判断
↓
非 GitHub 产品 / 平台 / 创作者工具按 V1.5 判断
↓
生成 Top 项目 + 观察池 + 淘汰项
↓
生成日报 JSON + 日报页面
↓
写入 GitHub 仓库
↓
Dashboard 读取 manifest + daily JSON
↓
用户在 Dashboard 打开日报
```
