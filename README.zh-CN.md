# Open-source AI Opportunity

<p>
  <a href="./README.md">English</a>
  ·
  <a href="./README.zh-CN.md"><strong>简体中文</strong></a>
</p>

这个仓库是 **Open-source AI Opportunity** 的数据仓库和静态 Dashboard。

## 核心原则

```text
这不是工具榜。
这不是 GitHub stars 榜。
这个系统要从工具、项目、工作流和信号里提炼“有价值的机会方案”。
```

工具不能直接进入 Top。工具只有被转化成下面这种结构后，才可以进入 Top：

```text
工具 / 项目 + 具体场景 + 工作流 + 最小验证 + 机会判断
```

例子：

```text
不要推荐：n8n
要推荐：n8n：AI 机会线索自动收集工作流

不要推荐：ComfyUI
要推荐：ComfyUI：商业视觉工作流模板拆解
```

## 这个仓库负责什么

1. 存放每日“价值优先”的机会日报。
2. 存放静态 Dashboard 读取的轻量 JSON 数据。
3. 通过 GitHub Pages 托管 Dashboard。

## 每日产物

- Dashboard JSON：`data/daily/YYYY-MM-DD.json`
- 正式日报页面：`reports/html/YYYY-MM-DD.html`

## 信息源规则

GitHub 仍然是主要来源，但 GitHub 只是信号层，不是最终价值层。

主要来源：

- GitHub repository search
- GitHub repository metadata
- GitHub README / docs / examples / workflows
- GitHub releases
- GitHub issues / pull requests，如有必要
- GitHub stars / forks / recent activity

辅助来源可以用于判断真实价值：

- GitHub 仓库里链接到的官网 / 官方文档
- Demo 页面
- YouTube / bilibili 使用案例
- X / Reddit 讨论
- Product Hunt
- 公开 workflow / template / examples

辅助来源的作用是回答：这个工具有没有真实场景、工作流和可复用价值。

## V1.5：有价值内容优先规则

V1.5 是当前启用的评价标准。

目标不是做 AI 新闻摘要，也不是做热门开源项目榜，而是识别有价值的机会方案：可以测试、研究、自动化、产品化，或变成可复用工作流。

## 收集对象

系统可以收集：

- GitHub 项目
- AI 工具
- 自动化工具
- 工作流
- 模板
- 可复用流程
- 具体场景
- 机会信号
- 系统改进想法

但最终 Top 必须是机会方案，不是原始工具。

## 筛选流程

### 第一步：找信号

先收集有信号的候选：

- stars / forks
- 最近更新
- releases
- README 质量
- docs / examples
- demo / screenshots / sample videos
- 公开 workflow 文件
- 真实使用案例
- 社区讨论

### 第二步：判断价值

每个候选必须回答：

- 它只是一个工具，还是能承载一个具体方案？
- 它解决什么真实问题？
- 它有没有工作流？
- 它能不能帮我做判断、节省时间、发现机会？
- 如果主流闭源工具更强，这个开源 / 工具方案的独特价值是什么？

如果最后只能得出“这个工具很火”或“这个框架很强”，不进入 Top。

### 第三步：转成方案

每个 Top 项都必须转成：

```text
工具 + 场景 + 工作流 + 最小验证 + 机会判断
```

## Top 入选条件

一个内容进入 Top 必须同时满足：

1. 有明确价值判断。
2. 有具体落地场景。
3. 有可描述为 input → process → output 的工作流。
4. 有今天 15-30 分钟可以做的最小验证。
5. 有 GitHub、文档、workflow、使用案例或社区讨论等信号支撑。

## 评分模型

| 维度 | 权重 | 含义 |
| --- | ---: | --- |
| `value_insight_score` | 35% | 是否提炼出有价值的机会判断 |
| `practical_workflow_score` | 25% | 是否能形成具体落地工作流 |
| `direction_fit_score` | 20% | 是否贴合你的兴趣、职业、项目或系统建设需求 |
| `signal_score` | 10% | GitHub 热度、更新、README、案例、讨论 |
| `today_action_score` | 10% | 今天是否能 15-30 分钟验证 |

排序原则：

```text
有价值 > 能落地 > 贴合我 > 有信号 > 热门
```

不是：

```text
热门 > 有名 > 技术看起来厉害
```

## 每日 JSON 格式

```json
{
  "date": "YYYY-MM-DD",
  "version": "V1.5-value-first",
  "title": "Open-source AI Opportunity",
  "theme": "Value-first opportunity schemes",
  "market_score": 8.6,
  "today_mission": "今天最值得做的一件事",
  "summary": [],
  "projects": [],
  "rejected_candidates": []
}
```

## Top 项字段建议

```json
{
  "id": "scheme-id",
  "rank": 1,
  "name": "n8n：AI 机会线索自动收集工作流",
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
  "value_insight": "这条方案背后的价值判断",
  "problem_solved": "它解决什么真实问题",
  "workflow": {
    "input": "输入是什么",
    "process": "中间怎么处理",
    "output": "输出是什么"
  },
  "mainstream_comparison": "和主流方案相比，它的价值在哪里",
  "today_action": "今天 15-30 分钟做什么",
  "success_criteria": [],
  "next_opportunity": "验证成功后，下一步能变成什么"
}
```

## 淘汰规则

这些不进 Top：

- 只有工具介绍，没有方案
- 只有 GitHub 热度，没有价值判断
- 只有技术概念，没有具体场景
- 只有 demo，没有可复用工作流
- 只是资料集合，没有今天可验证动作
- 不如主流方案，又说不清自己的独特价值
- 和你的工作、兴趣、项目或系统建设都无关

## 当前生产流程

```text
ChatGPT 计划任务
↓
采集 GitHub-first 信号
↓
结合辅助来源判断真实使用价值
↓
把工具 / 项目转成机会方案
↓
拒绝原始工具推荐
↓
写入每日 JSON 和 HTML 日报
↓
更新 manifest
↓
Dashboard 读取 manifest + daily JSON
```

Dashboard 地址：

```text
https://paxora.github.io/ai-opportunity-radar-data/
```
