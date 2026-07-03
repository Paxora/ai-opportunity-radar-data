const stateLabels = {
  favorite: "收藏",
  testing: "测试中",
  done: "已完成",
  dropped: "已放弃",
};

const appState = {
  manifest: { latest: null, days: [] },
  reports: new Map(),
  allProjects: [],
  library: [],
  search: "",
  category: "",
  status: "",
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

async function fetchJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function projectKey(project) {
  return project.id || project.github || project.website || project.name;
}

function loadStatus(key) {
  return localStorage.getItem(`radar-status:${key}`) || "";
}

function saveStatus(key, value) {
  if (!value || loadStatus(key) === value) {
    localStorage.removeItem(`radar-status:${key}`);
  } else {
    localStorage.setItem(`radar-status:${key}`, value);
  }
  renderProjects();
  renderLibrary();
}

function normalizeDays(days) {
  return [...(days || [])].sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function categoriesFor(project) {
  return Array.isArray(project.category) ? project.category : [];
}

function buildLibrary() {
  const grouped = new Map();
  for (const item of appState.allProjects) {
    const key = projectKey(item.project);
    const current = grouped.get(key) || {
      ...item.project,
      key,
      appearances: 0,
      firstSeen: item.date,
      lastSeen: item.date,
      dates: [],
    };
    current.appearances += 1;
    current.dates.push(item.date);
    current.firstSeen = String(item.date) < String(current.firstSeen) ? item.date : current.firstSeen;
    current.lastSeen = String(item.date) > String(current.lastSeen) ? item.date : current.lastSeen;
    grouped.set(key, current);
  }
  appState.library = [...grouped.values()].sort((a, b) => {
    return b.appearances - a.appearances || String(b.lastSeen).localeCompare(String(a.lastSeen));
  });
}

function updateCategoryFilter() {
  const categories = new Set();
  for (const item of appState.allProjects) {
    categoriesFor(item.project).forEach((category) => categories.add(category));
  }
  const select = $("#categoryFilter");
  select.innerHTML = '<option value="">全部分类</option>';
  [...categories].sort().forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

function matchesFilters(project) {
  const query = appState.search.trim().toLowerCase();
  const text = [
    project.name,
    categoriesFor(project).join(" "),
    project.why_today,
    project.today_action,
    project.china_competitors,
  ]
    .join(" ")
    .toLowerCase();
  const key = project.key || projectKey(project);
  const status = loadStatus(key);
  const categoryMatch = !appState.category || categoriesFor(project).includes(appState.category);
  const statusMatch = !appState.status || status === appState.status;
  const searchMatch = !query || text.includes(query);
  return categoryMatch && statusMatch && searchMatch;
}

function chipList(items) {
  return (items || []).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("");
}

function listItems(items) {
  if (!items || !items.length) return "";
  return `<ul class="detail-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function fitGrid(fit) {
  if (!fit || typeof fit !== "object") return "";
  return `<div class="fit-grid">${Object.entries(fit)
    .map(([name, value]) => `<div class="fit-item"><span>${escapeHtml(name)}</span><strong>${value}</strong></div>`)
    .join("")}</div>`;
}

function statusButtons(project) {
  const key = project.key || projectKey(project);
  const current = loadStatus(key);
  return `<div class="statuses">${Object.entries(stateLabels)
    .map(([value, label]) => {
      const active = current === value ? " is-active" : "";
      return `<button class="status-button${active}" data-key="${escapeAttr(key)}" data-status="${value}">${label}</button>`;
    })
    .join("")}</div>`;
}

function projectCard(project, options = {}) {
  const key = project.key || projectKey(project);
  const links = [
    project.github ? `<a href="${escapeAttr(project.github)}" target="_blank" rel="noreferrer">GitHub</a>` : "",
    project.website ? `<a href="${escapeAttr(project.website)}" target="_blank" rel="noreferrer">Website</a>` : "",
    project.docs ? `<a href="${escapeAttr(project.docs)}" target="_blank" rel="noreferrer">Docs</a>` : "",
  ]
    .filter(Boolean)
    .join("");

  return `<article class="project-card" data-key="${escapeAttr(key)}">
    <div class="project-top">
      <div>
        ${project.rank ? `<span class="rank">#${project.rank}</span>` : ""}
        <h3>${escapeHtml(project.name || "Untitled Project")}</h3>
        <div class="chips">${chipList(categoriesFor(project))}</div>
      </div>
      ${project.score !== undefined ? `<div class="score">${project.score}</div>` : ""}
    </div>
    ${options.library ? `<p class="muted">出现 ${project.appearances} 次 · 首次 ${project.firstSeen} · 最近 ${project.lastSeen}</p>` : ""}
    ${project.why_today ? `<p>${escapeHtml(project.why_today)}</p>` : ""}
    ${listItems(project.core_data)}
    ${project.today_action ? `<p><strong>今日行动：</strong>${escapeHtml(project.today_action)}</p>` : ""}
    ${fitGrid(project.fit)}
    ${project.business_model?.length ? `<div class="chips">${chipList(project.business_model)}</div>` : ""}
    ${links ? `<div class="links">${links}</div>` : ""}
    ${statusButtons({ ...project, key })}
  </article>`;
}

function renderToday(report) {
  $("#latestDate").textContent = report?.date || "--";
  $("#marketScore").textContent = report?.market_score ?? "--";
  $("#projectCount").textContent = report?.projects?.length || 0;
  $("#todayTitle").textContent = report ? `${report.title || "AI Opportunity Radar"} ${report.version || ""}` : "今日日报";
  $("#todayTheme").textContent = report?.theme || "暂无日报。";
  $("#heroCopy").textContent = report?.today_mission || "等待日报数据写入后，这里会自动显示最新机会雷达。";
  $("#todayMission").textContent = report?.today_mission || "ChatGPT 计划任务写入数据后会自动展示。";

  const latestDay = appState.manifest.days.find((day) => day.date === appState.manifest.latest);
  const htmlLink = $("#todayHtml");
  if (latestDay?.html) {
    htmlLink.href = latestDay.html;
    htmlLink.hidden = false;
  } else {
    htmlLink.hidden = true;
  }

  const summaries = report?.summary || [];
  $("#summaryList").innerHTML = summaries.length
    ? summaries.map((item) => `<div class="summary-card">${escapeHtml(item)}</div>`).join("")
    : "";
}

function renderProjects() {
  const latestReport = appState.reports.get(appState.manifest.latest);
  const projects = (latestReport?.projects || []).filter(matchesFilters);
  $("#todayProjects").innerHTML = projects.length ? projects.map((project) => projectCard(project)).join("") : emptyHtml();
  bindStatusButtons();
}

function renderHistory() {
  const days = appState.manifest.days || [];
  $("#historyList").innerHTML = days.length
    ? days
        .map(
          (day) => `<div class="history-item">
            <div>
              <strong>${escapeHtml(day.date)}</strong>
              <p class="muted">${escapeHtml(day.file || "")}</p>
            </div>
            <div class="history-actions">
              ${day.file ? `<a href="${escapeAttr(day.file)}" target="_blank" rel="noreferrer">JSON</a>` : ""}
              ${day.html ? `<a href="${escapeAttr(day.html)}" target="_blank" rel="noreferrer">HTML</a>` : ""}
              ${day.pdf ? `<a href="${escapeAttr(day.pdf)}" target="_blank" rel="noreferrer">PDF</a>` : ""}
            </div>
          </div>`,
        )
        .join("")
    : emptyHtml();
}

function renderArchive() {
  const pdfs = (appState.manifest.days || []).filter((day) => day.pdf);
  $("#archiveGrid").innerHTML = pdfs.length
    ? pdfs
        .map(
          (day) => `<div class="archive-card">
            <div>
              <strong>${escapeHtml(day.date)}</strong>
              <p class="muted">PDF report</p>
            </div>
            <a class="button" href="${escapeAttr(day.pdf)}" target="_blank" rel="noreferrer">打开 PDF</a>
          </div>`,
        )
        .join("")
    : emptyHtml();
}

function renderLibrary() {
  const projects = appState.library.filter(matchesFilters);
  $("#libraryProjects").innerHTML = projects.length
    ? projects.map((project) => projectCard(project, { library: true })).join("")
    : emptyHtml();
  bindStatusButtons();
}

function bindStatusButtons() {
  $$(".status-button").forEach((button) => {
    button.addEventListener("click", () => saveStatus(button.dataset.key, button.dataset.status));
  });
}

function bindEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.remove("is-active"));
      $$(".panel").forEach((item) => item.classList.remove("is-active"));
      tab.classList.add("is-active");
      $(`#${tab.dataset.tab}`).classList.add("is-active");
    });
  });

  $("#searchInput").addEventListener("input", (event) => {
    appState.search = event.target.value;
    renderProjects();
    renderLibrary();
  });

  $("#categoryFilter").addEventListener("change", (event) => {
    appState.category = event.target.value;
    renderProjects();
    renderLibrary();
  });

  $("#statusFilter").addEventListener("change", (event) => {
    appState.status = event.target.value;
    renderProjects();
    renderLibrary();
  });
}

function emptyHtml() {
  return $("#emptyTemplate").innerHTML;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

async function init() {
  bindEvents();
  try {
    appState.manifest = await fetchJson("data/manifest.json");
    appState.manifest.days = normalizeDays(appState.manifest.days);

    const reports = await Promise.allSettled(appState.manifest.days.map((day) => fetchJson(day.file)));
    reports.forEach((result, index) => {
      if (result.status === "fulfilled") {
        const day = appState.manifest.days[index];
        appState.reports.set(day.date, result.value);
        (result.value.projects || []).forEach((project) => {
          appState.allProjects.push({ date: day.date, project });
        });
      }
    });

    if (!appState.manifest.latest && appState.manifest.days[0]) {
      appState.manifest.latest = appState.manifest.days[0].date;
    }

    buildLibrary();
    updateCategoryFilter();
    renderToday(appState.reports.get(appState.manifest.latest));
    renderProjects();
    renderHistory();
    renderArchive();
    renderLibrary();
  } catch (error) {
    console.warn(error);
    renderToday(null);
    $("#todayProjects").innerHTML = emptyHtml();
    $("#historyList").innerHTML = emptyHtml();
    $("#archiveGrid").innerHTML = emptyHtml();
    $("#libraryProjects").innerHTML = emptyHtml();
  }
}

init();
