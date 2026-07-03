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

长期追踪文件：

- 非 GitHub Watchlist：`data/watchlist.json`

## 内容规则总览

系统采用双轨规则：

```text
V1.4：GitHub / 开源项目信号标准
V1.5.1：GitHub 以外的产品、平台、创作者工具、生态链信号标准
```

V1.4 不被 V1.5.1 替代。GitHub / 开源内容继续按 V1.4 判断；非 GitHub 产品和平台按 V1.5.1 判断。

## V1.4：GitHub / 开源项目标准

适用范围：

- 开源项目
- MCP 工具
- Agent 框架
- ComfyUI 插件 / 工作流
- 开源视频模型
- 自动化工具开源仓库
- Vibe Coding / Codex 相关工具

每个 GitHub 候选尽量记录：

- `stars`、`forks`、`star_growth`
- `last_updated`、`archived`
- `recent_activity`、release、issues / PR
- `readme_quality`
- demo / 官网 / 示例视频
- 是否贴合 AI 视频、摄影、内容生产、Vibe Coding、机会雷达

进入 Top 必须满足：

1. 至少 2 条硬数据信号。
2. 至少 1 条个人相关信号。
3. 至少 1 条 15-30 分钟内可执行的 `today_action`。

## V1.5.1：非 GitHub 与生态链标准

V1.5.1 只解决 GitHub 以外内容：

- AI 视频产品：Seedance、可灵、即梦、Vidu、PixVerse、Runway、Pika、Veo、Sora、Luma、Hailuo 等
- AIGC 创作平台：TapNow、Liblib.TV / LibTV、吐司、Krea、Civitai、OpenArt、Midjourney、Ideogram、Recraft、Canva、Firefly 等
- Agent / 自动化平台：Coze、Dify、n8n、FastGPT、Flowise、Langflow、Activepieces、Zapier、Make、Gumloop 等
- 创作者工具 / 工作流：无限画布、图生图、局部重绘、扩图、海报生成、分镜、AI 摄影、AI 短视频工作流

核心流程：

```text
候选发现 → 类型识别 → 多源验证 → 上下游合并 → 按类型评分 → Top / 观察 / 淘汰
```

## V1.5.1 硬规则

### 1. Top 必须保留 GitHub

每日 Top 必须至少包含：

```text
至少 2 个 GitHub / 开源项目
```

除非当天真的没有合格 GitHub 项目。如果少于 2 个，必须在 `rejected_candidates` 里解释原因。

### 2. 知名产品不能直接入选

Seedance、n8n、Coze、Dify、Krea、Runway、Sora 这类知名产品，不能只因为“本身很强”进入 Top。

必须有具体新信号：

- 新封装
- 新工作流
- 新创作者案例
- 新技术发布
- 新开源仓库
- 新产品入口
- 新的可执行测试路径

### 3. 做上下游合并，不重复拆项目

遇到同一条能力链时，要合并判断。

例如：

```text
Seedance 2.0 = 底层模型 / 能力源
LibTV / Dreamina / 豆包 / Krea / ComfyUI Seedance Node = 产品入口或工作流封装
创作者案例 = 真实使用验证
```

日报里不要重复写成几个独立机会，而是写成：

```text
Seedance 生态机会链：底层模型 → 产品封装 → 工作流 → 今日测试动作
```

### 4. 每个 Top 必须有深度判断

每个 Top 必须回答：

1. 它不是众所周知信息的地方在哪里？
2. 今天的新信号是什么？
3. 它和摄影 / 视频 / 内容生产 / 机会雷达有什么关系？
4. 它和其他工具的上下游关系是什么？
5. 今天 15-30 分钟具体测什么？

答不出来，不进 Top。

### 5. 不硬凑 Top 5

宁愿输出 3-4 个高质量项目，也不要用弱项目凑满 5 个。

## 多源验证

非 GitHub 候选至少要有 2 类证据，才允许进入 Top。

| 证据类型 | 说明 |
| --- | --- |
| `official` 官方证据 | 官网、官方公告、changelog、官方账号、产品入口 |
| `creator` 创作者证据 | B站、抖音、小红书、YouTube、案例视频、教程、作品流 |
| `community` 社区证据 | X、Reddit、Product Hunt、Discord、评论区讨论 |
| `technical` 技术证据 | GitHub、Hugging Face、ModelScope、arXiv、Papers with Code、公开模型或技术文档 |

新闻源只作为背景，不作为核心证据。

## Watchlist

`data/watchlist.json` 是非 GitHub 内容的固定追踪名单。

以后用户指出漏项时，先加入 Watchlist，再按 V1.5.1 规则长期追踪。

## Daily JSON 格式

每日 JSON 应支持：

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

字段说明：

- `projects`：今日 Top 项目。GitHub 项目按 V1.4，非 GitHub 项目按 V1.5.1。
- `ecosystem_chains`：上下游机会链，例如 Seedance → LibTV / Krea / ComfyUI → 创作者案例 → 今日动作。
- `watchlist_observations`：发现了信号，但证据不足或行动价值不够。
- `rejected_candidates`：发现了但未入选，并说明原因。

每个 Top 项目建议包含：

```json
{
  "source_type": "github_open_source / aigc_creation_platform / ecosystem_chain",
  "non_obvious_signal": "不是常识的地方",
  "relation": {
    "base_model": "底层模型，如果适用",
    "product_wrapper": "产品入口，如果适用",
    "workflow_layer": "工作流层，如果适用",
    "creator_case": "案例层，如果适用"
  },
  "evidence_pack": {
    "official": "官方证据",
    "creator": "创作者证据",
    "community": "社区证据",
    "technical": "技术证据",
    "evidence_count": 2,
    "confidence": "A / B / C"
  },
  "today_action": "今天 15-30 分钟做什么"
}
```

## 每天写入的文件

ChatGPT 计划任务每天需要更新：

```text
data/daily/YYYY-MM-DD.json
reports/html/YYYY-MM-DD.html
data/manifest.json
```

## Dashboard

Dashboard 是纯静态页面，不需要后端，主要由以下文件组成：

- `index.html`
- `assets/style.css`
- `assets/app.js`

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
非 GitHub 产品 / 平台 / 创作者工具按 V1.5.1 判断
↓
合并上下游生态链
↓
生成 Top 项目 + 生态链 + 观察池 + 淘汰项
↓
生成日报 JSON + 日报页面
↓
写入 GitHub 仓库
↓
Dashboard 读取 manifest + daily JSON
```
