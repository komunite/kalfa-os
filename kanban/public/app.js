/* ============================================================
   Kalfa OS — Kanban Board  |  app.js
   ============================================================ */

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let board = null;
let config = null;
let eventSource = null;
let searchQuery = "";
let priorityFilter = "";
let skillsList = { agents: [], commands: [] };

// Claude start modal state
let pendingDrop = null; // { taskId, columnKey }

// ---------------------------------------------------------------------------
// Toast
// ---------------------------------------------------------------------------
let toastTimer = null;
function showToast(msg, type = "") {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.className = `toast${type ? ` ${type}` : ""}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.className = "toast hidden"; }, 3500);
}

// ---------------------------------------------------------------------------
// Claude Start Modal
// ---------------------------------------------------------------------------
function findTaskById(id) {
  if (!board) return null;
  for (const tasks of Object.values(board.columns)) {
    const t = tasks.find((t) => t.id === id);
    if (t) return t;
  }
  return null;
}

function showStartModal(taskId, targetColumn) {
  const task = findTaskById(taskId);
  if (!task) return;

  pendingDrop = { taskId, targetColumn };

  // Populate preview
  const PRIORITY_TR = { high: "Yüksek", medium: "Orta", low: "Düşük" };
  const PRIORITY_CLS = { high: "p-high", medium: "p-medium", low: "p-low" };

  const preview = document.getElementById("start-task-preview");
  preview.innerHTML = `
    <div class="preview-title">${task.text}</div>
    <div class="preview-meta">
      ${task.priority ? `<span class="preview-priority priority-badge ${PRIORITY_CLS[task.priority] || ""}">${PRIORITY_TR[task.priority]}</span>` : ""}
      ${task.progress > 0 ? `<span style="font-size:11px;color:var(--text-3)">%${task.progress}</span>` : ""}
    </div>
    ${task.note ? `<div class="preview-note">${task.note}</div>` : ""}
    ${task.progress > 0 ? `
      <div class="preview-progress-track">
        <div class="preview-progress-fill" style="width:${task.progress}%"></div>
      </div>` : ""}
  `;

  // Pre-fill skill from task meta
  populateSkillSelects(task.skill || "");
  document.getElementById("start-modal").classList.remove("hidden");
}

window.cancelStartModal = function () {
  document.getElementById("start-modal").classList.add("hidden");
  pendingDrop = null;
};

window.confirmStartModal = async function (sendToClaude) {
  if (!pendingDrop) return;
  const { taskId, targetColumn } = pendingDrop;

  // Taşımadan önce task metnini kaydet (ID taşıma sonrası değişir)
  const taskText = findTaskById(taskId)?.text ?? null;

  document.getElementById("start-modal").classList.add("hidden");
  pendingDrop = null;

  // Move task to target column
  try {
    board = await api("PUT", `/api/tasks/${taskId}`, { columnKey: targetColumn });
    renderBoard();
  } catch (err) {
    showToast("Taşıma başarısız: " + err.message, "error");
    return;
  }

  if (!sendToClaude) {
    showToast("Görev taşındı.");
    return;
  }

  // Read selected skill from start modal
  const selectedSkill = document.getElementById("start-skill")?.value || null;

  // Send to Claude — metin ile ara (taşıma sonrası ID değişmiş olabilir)
  try {
    await api("POST", "/api/start-task", { taskId, taskText, skill: selectedSkill || undefined });
    showToast("✓ Görev Claude'a gönderildi. /sync yazarak teslim alın.", "success");
  } catch (err) {
    showToast("Claude'a gönderilemedi: " + err.message, "error");
  }
};

// ---------------------------------------------------------------------------
// Column background colors derived from config hex color
// ---------------------------------------------------------------------------
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------
async function api(method, url, body) {
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`${method} ${url} → ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// SSE
// ---------------------------------------------------------------------------
function connectSSE() {
  if (eventSource) eventSource.close();
  setConnState("connecting");
  eventSource = new EventSource("/events");

  eventSource.addEventListener("connected", () => setConnState("connected"));
  eventSource.addEventListener("heartbeat",  () => setConnState("connected"));

  eventSource.addEventListener("board-changed", (e) => {
    board = JSON.parse(e.data);
    renderBoard();
  });

  eventSource.addEventListener("config-changed", (e) => {
    config = JSON.parse(e.data);
    populateColumnSelect();
    renderBoard();
  });

  eventSource.addEventListener("activity-changed", (e) => renderActivity(JSON.parse(e.data)));
  eventSource.addEventListener("status-changed",   (e) => renderStatus(JSON.parse(e.data)));

  eventSource.onerror = () => {
    setConnState("error");
    setTimeout(connectSSE, 3000);
  };
}

function setConnState(state) {
  const el = document.getElementById("connection-dot");
  const labels = { connecting: "Bağlanıyor", connected: "Bağlı", error: "Bağlantı kesildi" };
  el.className = `status-pill pill-${state}`;
  el.textContent = labels[state];
}

// ---------------------------------------------------------------------------
// Render: Board
// ---------------------------------------------------------------------------
function renderBoard() {
  if (!board || !config) return;
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";

  for (const col of config.columns) {
    const tasks = filterTasks(board.columns[col.key] ?? []);
    boardEl.appendChild(buildColumn(col, tasks));
  }
}

function filterTasks(tasks) {
  return tasks.filter((t) => {
    const matchSearch = !searchQuery || t.text.toLowerCase().includes(searchQuery) ||
      (t.note && t.note.toLowerCase().includes(searchQuery));
    const matchPriority = !priorityFilter || t.priority === priorityFilter;
    return matchSearch && matchPriority;
  });
}

function buildColumn(col, tasks) {
  const wrap = document.createElement("div");
  wrap.className = "column";
  wrap.dataset.column = col.key;
  wrap.style.background = hexToRgba(col.color, 0.12);

  // Header
  const hdr = el("div", "col-header");
  const titleWrap = el("div", "col-title-wrap");

  const dot = el("span", "col-dot");
  dot.style.background = col.color;

  const title = el("h2", "col-title");
  title.textContent = col.label;

  const count = el("span", "col-count");
  count.textContent = tasks.length;

  const more = el("button", "col-more");
  more.textContent = "···";
  more.title = "Seçenekler";

  titleWrap.appendChild(dot);
  titleWrap.appendChild(title);
  titleWrap.appendChild(count);
  hdr.appendChild(titleWrap);
  hdr.appendChild(more);
  wrap.appendChild(hdr);

  // Task list
  const list = el("div", "task-list");
  list.dataset.column = col.key;

  for (const task of tasks) list.appendChild(buildCard(task));

  // Drop events
  list.addEventListener("dragover",  (e) => { e.preventDefault(); wrap.classList.add("drag-over"); });
  list.addEventListener("dragleave", (e) => { if (!wrap.contains(e.relatedTarget)) wrap.classList.remove("drag-over"); });
  list.addEventListener("drop", async (e) => {
    e.preventDefault();
    wrap.classList.remove("drag-over");
    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    // Find source column to check if this is actually a move
    const srcTask = findTaskById(taskId);
    if (srcTask && srcTask.columnKey === col.key) return; // same column, no-op

    // "In Progress" kolonuna taşıma → Claude onay popup'ı
    if (col.key === "in-progress") {
      showStartModal(taskId, col.key);
      return;
    }

    // Diğer kolonlar → doğrudan taşı
    try { board = await api("PUT", `/api/tasks/${taskId}`, { columnKey: col.key }); renderBoard(); }
    catch (err) { console.error("Drop failed:", err); }
  });

  wrap.appendChild(list);

  // Add button at bottom
  const addBtn = el("button", "col-add-btn");
  addBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/></svg> Görev ekle`;
  addBtn.addEventListener("click", () => openModal(col.key));
  wrap.appendChild(addBtn);

  return wrap;
}

// ---------------------------------------------------------------------------
// Task Card
// ---------------------------------------------------------------------------
function buildCard(task) {
  const card = el("div", `task-card${task.checked ? " is-done" : ""}`);
  card.draggable = true;
  card.dataset.id = task.id;

  // Top: priority badge + actions
  const top = el("div", "card-top");

  const badge = el("span", `priority-badge${task.priority ? ` p-${task.priority}` : ""}`);
  const PRIORITY_LABELS = { high: "Yüksek", medium: "Orta", low: "Düşük" };
  badge.textContent = PRIORITY_LABELS[task.priority] || "";
  badge.style.display = task.priority ? "" : "none";

  const actions = el("div", "card-actions");

  const editBtn = el("button", "card-btn");
  editBtn.title = "Düzenle";
  editBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>`;
  editBtn.addEventListener("click", () => openModal(task.columnKey, task));

  const delBtn = el("button", "card-btn del");
  delBtn.title = "Sil";
  delBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
  delBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!confirm(`"${task.text}" silinsin mi?`)) return;
    try { board = await api("DELETE", `/api/tasks/${task.id}`); renderBoard(); }
    catch (err) { console.error(err); }
  });

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);
  top.appendChild(badge);
  top.appendChild(actions);
  card.appendChild(top);

  // Title row: checkbox + text
  const titleRow = el("div", "card-title");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = task.checked;
  cb.addEventListener("change", async () => {
    try { board = await api("PUT", `/api/tasks/${task.id}`, { checked: cb.checked }); renderBoard(); }
    catch { cb.checked = !cb.checked; }
  });

  const titleText = el("span", "card-title-text");
  titleText.textContent = task.text;

  titleRow.appendChild(cb);
  titleRow.appendChild(titleText);
  card.appendChild(titleRow);

  // Note
  if (task.note) {
    const note = el("p", "card-note");
    note.textContent = `Note: ${task.note}`;
    card.appendChild(note);
  }

  // Progress bar
  const progress = typeof task.progress === "number" ? task.progress : 0;
  if (progress > 0 || task.note) { // show bar when there's content
    const prog = el("div", "card-progress");
    const lbl = el("div", "progress-label");
    const lblText = el("span");
    lblText.textContent = "Progress";
    const pct = el("span");
    pct.textContent = `${progress}%`;
    lbl.appendChild(lblText);
    lbl.appendChild(pct);

    const track = el("div", "progress-track");
    const fill = el("div", "progress-fill");
    fill.style.width = `${progress}%`;
    track.appendChild(fill);

    prog.appendChild(lbl);
    prog.appendChild(track);
    card.appendChild(prog);
  }

  // Test senaryoları özet
  const scenarios = task.testScenarios || [];
  if (scenarios.length > 0) {
    const passed  = scenarios.filter((s) => s.result === "pass").length;
    const failed  = scenarios.filter((s) => s.result === "fail").length;
    const bugs    = scenarios.filter((s) => s.result === "bug").length;
    const total   = scenarios.length;
    const hasBugs = bugs > 0 || failed > 0;
    const testBadge = el("div", `card-test-summary${hasBugs ? " has-issues" : passed === total ? " all-pass" : ""}`);
    const parts = [`${passed}/${total} ✓`];
    if (bugs)   parts.push(`${bugs} ⚠`);
    if (failed) parts.push(`${failed} ✗`);
    testBadge.textContent = parts.join("  ");
    testBadge.title = scenarios.map((s) => {
      const icons = { pass: "✓", fail: "✗", bug: "⚠", null: "○" };
      return `${icons[s.result] || "○"} ${s.text}${s.bug ? ": " + s.bug : ""}`;
    }).join("\n");
    card.appendChild(testBadge);
  }

  // Skill badge
  if (task.skill) {
    const skillBadge = el("div", "card-skill");
    const icon = task.skill.startsWith("@") ? "🤖" : "⚡";
    skillBadge.textContent = `${icon} ${task.skill}`;
    card.appendChild(skillBadge);
  }

  // Drag
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    requestAnimationFrame(() => card.classList.add("dragging"));
  });
  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    document.querySelectorAll(".drag-over").forEach((c) => c.classList.remove("drag-over"));
  });

  return card;
}

// ---------------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------------
let currentTestScenarios = [];

function renderTestScenarios() {
  const list = document.getElementById("test-scenarios-list");
  if (!list) return;
  list.innerHTML = "";
  currentTestScenarios.forEach((s, i) => {
    const row = el("div", "test-scenario-row");
    row.dataset.index = i;

    const statusBtn = el("button", `test-status-btn test-status-${s.result || "none"}`);
    statusBtn.type = "button";
    statusBtn.title = "Durum değiştir";
    const STATUS_ICONS = { none: "○", pass: "✓", fail: "✗", bug: "⚠" };
    statusBtn.textContent = STATUS_ICONS[s.result || "none"];
    statusBtn.addEventListener("click", () => {
      const cycle = { none: "pass", pass: "fail", fail: "bug", bug: "none" };
      currentTestScenarios[i].result = cycle[s.result || "none"];
      renderTestScenarios();
    });

    const textSpan = el("span", "test-scenario-text");
    textSpan.textContent = s.text;

    const bugInput = el("input", "test-bug-input");
    bugInput.type = "text";
    bugInput.placeholder = "Bug notu...";
    bugInput.value = s.bug || "";
    bugInput.style.display = s.result === "bug" ? "" : "none";
    bugInput.addEventListener("input", () => { currentTestScenarios[i].bug = bugInput.value; });

    const delBtn = el("button", "card-btn del test-del-btn");
    delBtn.type = "button";
    delBtn.title = "Sil";
    delBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>`;
    delBtn.addEventListener("click", () => {
      currentTestScenarios.splice(i, 1);
      renderTestScenarios();
    });

    row.appendChild(statusBtn);
    row.appendChild(textSpan);
    row.appendChild(bugInput);
    row.appendChild(delBtn);
    list.appendChild(row);
  });
}

window.addTestScenario = function () {
  const input = document.getElementById("new-scenario-input");
  const text = input.value.trim();
  if (!text) return;
  currentTestScenarios.push({ text, result: null, bug: "" });
  input.value = "";
  renderTestScenarios();
};

document.addEventListener("DOMContentLoaded", () => {
  const inp = document.getElementById("new-scenario-input");
  if (inp) inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); window.addTestScenario(); } });
});

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------
function openModal(defaultColumn, task) {
  const modal = document.getElementById("task-modal");
  const title = document.getElementById("modal-title");
  const editId = document.getElementById("edit-task-id");

  document.getElementById("task-text").value     = task ? task.text : "";
  document.getElementById("task-note").value     = task ? (task.note || "") : "";
  document.getElementById("task-priority").value = task ? (task.priority || "") : "";
  document.getElementById("task-progress").value = task ? (task.progress ?? 0) : 0;
  document.getElementById("progress-display").textContent = `${task ? (task.progress ?? 0) : 0}%`;
  currentTestScenarios = task ? JSON.parse(JSON.stringify(task.testScenarios || [])) : [];
  renderTestScenarios();
  populateSkillSelects(task ? (task.skill || "") : "");

  const colSelect = document.getElementById("task-column");
  colSelect.value = task ? task.columnKey : (defaultColumn || (config?.columns[0]?.key ?? ""));

  editId.value = task ? task.id : "";
  title.textContent = task ? "Görevi Düzenle" : "Yeni Görev";

  modal.classList.remove("hidden");
  setTimeout(() => document.getElementById("task-text").focus(), 50);
}

window.openModal = openModal;

window.closeModal = function () {
  document.getElementById("task-modal").classList.add("hidden");
  document.getElementById("task-form").reset();
  document.getElementById("edit-task-id").value = "";
  document.getElementById("progress-display").textContent = "0%";
  const skillSel = document.getElementById("task-skill");
  if (skillSel) skillSel.value = "";
  currentTestScenarios = [];
  renderTestScenarios();
};

// Modal: Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") window.closeModal();
});

// Modal: progress slider
document.getElementById("task-progress").addEventListener("input", (e) => {
  document.getElementById("progress-display").textContent = `${e.target.value}%`;
});

// Modal: form submit
document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskId    = document.getElementById("edit-task-id").value;
  const text      = document.getElementById("task-text").value.trim();
  const columnKey = document.getElementById("task-column").value;
  const priority  = document.getElementById("task-priority").value || null;
  const note      = document.getElementById("task-note").value.trim();
  const progress  = Number(document.getElementById("task-progress").value);
  const skill     = document.getElementById("task-skill")?.value || null;
  const testScenarios = currentTestScenarios.slice();

  if (!text) return;

  try {
    if (taskId) {
      board = await api("PUT", `/api/tasks/${taskId}`, { text, columnKey, priority, note, progress, skill, testScenarios });
    } else {
      board = await api("POST", "/api/tasks", { text, columnKey, priority, note, progress, skill, testScenarios });
    }
    renderBoard();
    window.closeModal();
  } catch (err) {
    console.error("Save failed:", err);
    alert("Kayıt başarısız: " + err.message);
  }
});

// ---------------------------------------------------------------------------
// Populate skill selects
// ---------------------------------------------------------------------------
function populateSkillSelects(currentValue) {
  const selects = ["task-skill", "start-skill"].map((id) => document.getElementById(id)).filter(Boolean);
  for (const sel of selects) {
    const prev = currentValue !== undefined ? currentValue : sel.value;
    sel.innerHTML = '<option value="">— Varsayılan</option>';
    if (skillsList.agents.length) {
      const grp = document.createElement("optgroup");
      grp.label = "🤖 Agent";
      for (const a of skillsList.agents) {
        const opt = document.createElement("option");
        opt.value = `@${a}`;
        opt.textContent = a;
        grp.appendChild(opt);
      }
      sel.appendChild(grp);
    }
    if (skillsList.commands.length) {
      const grp = document.createElement("optgroup");
      grp.label = "⚡ Komut";
      for (const c of skillsList.commands) {
        const opt = document.createElement("option");
        opt.value = `/${c}`;
        opt.textContent = `/${c}`;
        grp.appendChild(opt);
      }
      sel.appendChild(grp);
    }
    if (prev) sel.value = prev;
  }
}

// ---------------------------------------------------------------------------
// Populate column select
// ---------------------------------------------------------------------------
function populateColumnSelect() {
  const sel = document.getElementById("task-column");
  sel.innerHTML = "";
  if (!config) return;
  for (const col of config.columns) {
    const opt = document.createElement("option");
    opt.value = col.key;
    opt.textContent = col.label;
    sel.appendChild(opt);
  }
}

// ---------------------------------------------------------------------------
// Render: Activity
// ---------------------------------------------------------------------------
function renderActivity(items) {
  const list = document.getElementById("activity-list");
  if (!items || items.length === 0) {
    list.innerHTML = '<li class="act-empty">Henüz aktivite yok.</li>';
    return;
  }
  list.innerHTML = items.map((item) => `
    <li>
      <span class="act-ts">${item.timestamp || ""}</span>
      ${item.tool ? `<span class="act-tool">${item.tool}</span>` : ""}
      <span class="act-path">${item.filePath || ""}</span>
    </li>`).join("");
}

// ---------------------------------------------------------------------------
// Render: Status
// ---------------------------------------------------------------------------
function renderStatus(data) {
  const el = document.getElementById("status-now");
  if (!data?.items?.length) { el.textContent = "—"; return; }
  el.textContent = data.items[0];
  el.title = data.items.join(" · ");
}

// ---------------------------------------------------------------------------
// Activity panel toggle
// ---------------------------------------------------------------------------
document.getElementById("activity-toggle").addEventListener("click", () => {
  document.getElementById("activity-panel").classList.toggle("hidden");
});

document.getElementById("activity-close").addEventListener("click", () => {
  document.getElementById("activity-panel").classList.add("hidden");
});

// ---------------------------------------------------------------------------
// Search + Filter
// ---------------------------------------------------------------------------
document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderBoard();
});

document.getElementById("priority-filter").addEventListener("change", (e) => {
  priorityFilter = e.target.value;
  renderBoard();
});

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
async function init() {
  try {
    [config, board, skillsList] = await Promise.all([
      fetch("/api/config").then((r) => r.json()),
      fetch("/api/board").then((r)  => r.json()),
      fetch("/api/skills-list").then((r) => r.json()).catch(() => ({ agents: [], commands: [] })),
    ]);
    populateColumnSelect();
    populateSkillSelects();
    renderBoard();

    const [activity, status] = await Promise.all([
      fetch("/api/activity").then((r) => r.json()),
      fetch("/api/status").then((r)   => r.json()),
    ]);
    renderActivity(activity);
    renderStatus(status);
  } catch (err) {
    document.getElementById("board").innerHTML =
      `<p style="color:#ef4444;padding:40px;font-size:13px">
        Sunucuya bağlanılamadı. <br><br>
        <code style="background:#f3f4f6;padding:4px 8px;border-radius:4px">npm run kanban</code>
        komutunu çalıştırın.
      </p>`;
  }
  connectSSE();
}

init();
