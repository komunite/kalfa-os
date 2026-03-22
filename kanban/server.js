"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { spawn } = require("node:child_process");
const express = require("express");
const { loadConfig, watchConfig } = require("./config.js");
const { parse, serialize, isMigratable, migrateBoard, findTask } = require("./parser.js");
const { readMeta, writeMeta, getMeta, setMeta, deleteMeta } = require("./meta.js");

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const PROJECT_ROOT = path.resolve(__dirname, "..");
const TASKBOARD_PATH = path.join(PROJECT_ROOT, "TaskBoard.md");
const AUDIT_TRAIL_PATH = path.join(PROJECT_ROOT, ".claude/logs/audit-trail.md");
const MEMORY_PATH = path.join(PROJECT_ROOT, ".claude/memory.md");
const DIRTY_FLAG_PATH = path.join(PROJECT_ROOT, ".claude/logs/.kanban-dirty");
const LOGS_DIR = path.join(PROJECT_ROOT, ".claude/logs");
const INBOX_PATH = path.join(PROJECT_ROOT, ".claude/kanban-inbox.md");
const SCRATCHPAD_PATH = path.join(PROJECT_ROOT, "Scratchpad.md");
const PORT = process.env.PORT || 2903;

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentConfig = null;
const sseClients = new Set();
let isWriting = false;
const debounceTimers = {};

// ---------------------------------------------------------------------------
// SSE
// ---------------------------------------------------------------------------
function broadcast(eventName, data) {
	const payload = `event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`;
	for (const res of sseClients) {
		try {
			res.write(payload);
		} catch {
			sseClients.delete(res);
		}
	}
}

// ---------------------------------------------------------------------------
// Board helpers (with meta merge)
// ---------------------------------------------------------------------------
function readBoard() {
	if (!fs.existsSync(TASKBOARD_PATH)) {
		const board = { columns: {} };
		for (const col of currentConfig.columns) board.columns[col.key] = [];
		return board;
	}
	const raw = fs.readFileSync(TASKBOARD_PATH, "utf8");
	const board = parse(raw, currentConfig);
	const meta = readMeta(PROJECT_ROOT);

	// Merge meta into tasks
	for (const tasks of Object.values(board.columns)) {
		for (const task of tasks) {
			const m = getMeta(meta, task.text);
			task.priority = m.priority;
			task.note = m.note;
			task.progress = m.progress;
			task.skill = m.skill;
			task.testScenarios = m.testScenarios ?? [];
		}
	}
	return board;
}

function writeBoard(board) {
	const raw = serialize(board, currentConfig);
	const tmpPath = `${TASKBOARD_PATH}.tmp`;
	isWriting = true;
	try {
		fs.writeFileSync(tmpPath, raw, "utf8");
		fs.renameSync(tmpPath, TASKBOARD_PATH);
	} finally {
		setTimeout(() => { isWriting = false; }, 300);
	}
}

// ---------------------------------------------------------------------------
// Activity feed
// ---------------------------------------------------------------------------
function readActivity() {
	if (!fs.existsSync(AUDIT_TRAIL_PATH)) return [];
	const lines = fs.readFileSync(AUDIT_TRAIL_PATH, "utf8").split("\n").filter(Boolean);
	return lines
		.slice(-50)
		.reverse()
		.map((line) => {
			const m = line.match(/^- `([^`]+)` \| (\w+) \| (.+)$/);
			if (m) return { timestamp: m[1], tool: m[2], filePath: m[3] };
			return { timestamp: "", tool: "", filePath: line };
		});
}

// ---------------------------------------------------------------------------
// Status (memory.md "Şimdi")
// ---------------------------------------------------------------------------
function readStatus() {
	if (!fs.existsSync(MEMORY_PATH)) return { items: [] };
	const lines = fs.readFileSync(MEMORY_PATH, "utf8").split("\n");
	let inSection = false;
	const items = [];
	for (const line of lines) {
		if (line.match(/^## Şimdi/)) { inSection = true; continue; }
		if (inSection && line.match(/^## /)) break;
		if (inSection && line.trim()) items.push(line.replace(/^[-*]\s*/, "").trim());
	}
	return { items };
}

// ---------------------------------------------------------------------------
// File watching
// ---------------------------------------------------------------------------
function debounceWatch(key, callback) {
	clearTimeout(debounceTimers[key]);
	debounceTimers[key] = setTimeout(callback, 150);
}

function watchFile(filePath, eventName, readFn) {
	function startWatch() {
		if (!fs.existsSync(filePath)) {
			const dir = path.dirname(filePath);
			if (!fs.existsSync(dir)) { setTimeout(startWatch, 2000); return; }
			const dw = fs.watch(dir, (_, name) => {
				if (name === path.basename(filePath) && fs.existsSync(filePath)) {
					dw.close(); startWatch();
				}
			});
			dw.on("error", () => {});
			return;
		}
		const watcher = fs.watch(filePath, () => {
			debounceWatch(filePath, () => {
				if (filePath === TASKBOARD_PATH && isWriting) return;
				try { broadcast(eventName, readFn()); } catch { /* ignore */ }
			});
		});
		watcher.on("error", () => setTimeout(startWatch, 500));
	}
	startWatch();
}

function watchDirtyFlag() {
	fs.mkdirSync(LOGS_DIR, { recursive: true });
	function startWatch() {
		const dw = fs.watch(LOGS_DIR, (_, name) => {
			if (name === ".kanban-dirty" && !isWriting) {
				debounceWatch(DIRTY_FLAG_PATH, () => {
					try { broadcast("board-changed", readBoard()); } catch { /* ignore */ }
				});
			}
		});
		dw.on("error", () => setTimeout(startWatch, 500));
	}
	startWatch();
}

setInterval(() => broadcast("heartbeat", {}), 30000);

// ---------------------------------------------------------------------------
// Claude terminal launcher
// ---------------------------------------------------------------------------
function spawnClaudeTerminal(taskTitle) {
	const title = `Claude: ${taskTitle.slice(0, 40)}`;
	const dir = PROJECT_ROOT;

	// Launch claude with /kanban-start slash command — auto-executes without user input
	const launchScript = path.join(LOGS_DIR, "_claude-launch.sh");
	fs.mkdirSync(LOGS_DIR, { recursive: true });
	fs.writeFileSync(
		launchScript,
		"#!/bin/bash\nunset CLAUDECODE\nclaude '/kanban-start'\nexec bash\n",
		"utf8",
	);

	try {
		spawn("wt.exe", ["new-tab", "--title", title, "-d", dir, "--", "bash", "--login", launchScript], {
			detached: true, stdio: "ignore", windowsHide: false,
		}).unref();
	} catch {
		spawn("cmd.exe", ["/c", "start", "bash", "--login", launchScript], {
			detached: true, stdio: "ignore", cwd: dir,
		}).unref();
	}
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------
function migrateIfNeeded() {
	if (!fs.existsSync(TASKBOARD_PATH)) return;
	const raw = fs.readFileSync(TASKBOARD_PATH, "utf8");
	if (isMigratable(raw)) {
		console.log("[server] Eski format tespit edildi, migrate ediliyor...");
		const migrated = migrateBoard(raw, currentConfig);
		const tmp = `${TASKBOARD_PATH}.tmp`;
		fs.writeFileSync(tmp, migrated, "utf8");
		fs.renameSync(tmp, TASKBOARD_PATH);
		console.log("[server] Migrasyon tamamlandı.");
	}
}

// ---------------------------------------------------------------------------
// Express
// ---------------------------------------------------------------------------
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/config", (_req, res) => res.json(currentConfig));
app.get("/api/board", (_req, res) => { try { res.json(readBoard()); } catch (e) { res.status(500).json({ error: e.message }); } });
app.get("/api/activity", (_req, res) => res.json(readActivity()));
app.get("/api/status", (_req, res) => res.json(readStatus()));

// POST /api/tasks
app.post("/api/tasks", (req, res) => {
	const { text, columnKey, priority, note, progress, skill, testScenarios } = req.body;
	if (!text || !columnKey) return res.status(400).json({ error: "text ve columnKey gerekli" });

	const board = readBoard();
	if (!board.columns[columnKey]) return res.status(400).json({ error: "Geçersiz kolon" });

	board.columns[columnKey].push({ id: "", text: text.trim(), checked: false, columnKey });
	writeBoard(board);

	// Save meta
	const meta = readMeta(PROJECT_ROOT);
	setMeta(meta, null, text.trim(), {
		priority: priority ?? null,
		note: note ?? "",
		progress: progress ?? 0,
		skill: skill ?? null,
		testScenarios: testScenarios ?? [],
	});
	writeMeta(PROJECT_ROOT, meta);

	const fresh = readBoard();
	broadcast("board-changed", fresh);
	res.status(201).json(fresh);
});

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
	const board = readBoard();
	const found = findTask(board, req.params.id);
	if (!found) return res.status(404).json({ error: "Task bulunamadı" });

	const { text, checked, columnKey, priority, note, progress, skill, testScenarios } = req.body;
	const { task, columnKey: srcKey, index } = found;
	const oldText = task.text;

	if (text !== undefined) task.text = text.trim();
	if (checked !== undefined) task.checked = Boolean(checked);

	if (columnKey && columnKey !== srcKey) {
		if (!board.columns[columnKey]) return res.status(400).json({ error: "Geçersiz kolon" });
		board.columns[srcKey].splice(index, 1);
		board.columns[columnKey].push({ ...task, columnKey });
	} else {
		board.columns[srcKey][index] = task;
	}

	writeBoard(board);

	// Update meta
	const meta = readMeta(PROJECT_ROOT);
	const newText = task.text;
	const metaUpdate = {};
	if (priority !== undefined) metaUpdate.priority = priority;
	if (note !== undefined) metaUpdate.note = note;
	if (progress !== undefined) metaUpdate.progress = progress;
	if (skill !== undefined) metaUpdate.skill = skill;
	if (testScenarios !== undefined) metaUpdate.testScenarios = testScenarios;
	if (Object.keys(metaUpdate).length || oldText !== newText) {
		setMeta(meta, oldText, newText, metaUpdate);
		writeMeta(PROJECT_ROOT, meta);
	}

	const fresh = readBoard();
	broadcast("board-changed", fresh);
	res.json(fresh);
});

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
	const board = readBoard();
	const found = findTask(board, req.params.id);
	if (!found) return res.status(404).json({ error: "Task bulunamadı" });

	const { task } = found;
	board.columns[found.columnKey].splice(found.index, 1);
	writeBoard(board);

	const meta = readMeta(PROJECT_ROOT);
	deleteMeta(meta, task.text);
	writeMeta(PROJECT_ROOT, meta);

	const fresh = readBoard();
	broadcast("board-changed", fresh);
	res.json(fresh);
});

// POST /api/start-task — Görevi Claude'a gönder
app.post("/api/start-task", (req, res) => {
	const { taskId, taskText, skill: overrideSkill } = req.body;
	if (!taskId && !taskText) return res.status(400).json({ error: "taskId veya taskText gerekli" });

	const board = readBoard();
	let task = null;

	// Önce ID ile ara; bulamazsan metin eşleşmesi dene (taşıma sonrası ID değişmiş olabilir)
	if (taskId) {
		const found = findTask(board, taskId);
		if (found) task = found.task;
	}
	if (!task && taskText) {
		for (const tasks of Object.values(board.columns)) {
			const match = tasks.find((t) => t.text === taskText);
			if (match) { task = match; break; }
		}
	}
	if (!task) return res.status(404).json({ error: "Task bulunamadı" });
	const PRIORITY_TR = { high: "Yüksek 🔴", medium: "Orta 🟡", low: "Düşük 🟢" };
	const priority = task.priority ? PRIORITY_TR[task.priority] : "Belirtilmemiş";
	const now = new Date().toLocaleString("tr-TR");
	const selectedSkill = overrideSkill || task.skill || null;

	const inboxContent = [
		`Görev       : ${task.text}`,
		`Öncelik     : ${priority}`,
		`İlerleme    : %${task.progress ?? 0}`,
		task.note ? `Not         : ${task.note}` : null,
		selectedSkill ? `Skill/Agent : ${selectedSkill}` : null,
		`Kolon       : In Progress`,
		`Gönderim    : ${now}`,
		"",
		"Bu görevi şimdi üstlen. İlk somut adımı belirle ve çalışmaya başla.",
	].filter((l) => l !== null).join("\n");

	// Write inbox file (SessionStart hook reads this)
	fs.mkdirSync(path.dirname(INBOX_PATH), { recursive: true });
	fs.writeFileSync(INBOX_PATH, inboxContent, "utf8");

	// Launch Claude in a new Windows Terminal tab — /kanban-start command auto-executes
	spawnClaudeTerminal(task.text);

	// Also append to Scratchpad.md so active /sync picks it up
	try {
		const scratchEntry = `\n- [Kanban → In Progress] ${task.text}${task.note ? ` — ${task.note}` : ""} (${now})\n`;
		fs.appendFileSync(SCRATCHPAD_PATH, scratchEntry, "utf8");
	} catch { /* Scratchpad optional */ }

	res.json({ success: true, message: "Claude terminalde açılıyor..." });
});

// POST /api/complete-task — Görevi tamamlandı olarak işaretle ve Done'a taşı
app.post("/api/complete-task", (req, res) => {
	const { taskId, taskText } = req.body;
	if (!taskId && !taskText) return res.status(400).json({ error: "taskId veya taskText gerekli" });

	const board = readBoard();
	let found = null;

	if (taskId) found = findTask(board, taskId);
	if (!found && taskText) {
		for (const [colKey, tasks] of Object.entries(board.columns)) {
			const idx = tasks.findIndex((t) => t.text === taskText);
			if (idx !== -1) { found = { task: tasks[idx], columnKey: colKey, index: idx }; break; }
		}
	}
	if (!found) return res.status(404).json({ error: "Task bulunamadı" });

	// "done" kolonunu bul (ilk done/tamamlandi key'i)
	const doneKey = req.body.doneColumnKey
		|| currentConfig.columns.find((c) => /^done|tamaml/i.test(c.key))?.key
		|| currentConfig.columns[currentConfig.columns.length - 1].key;

	const { task, columnKey: srcKey, index } = found;
	if (srcKey !== doneKey) {
		board.columns[srcKey].splice(index, 1);
		board.columns[doneKey] = board.columns[doneKey] || [];
		board.columns[doneKey].push({ ...task, columnKey: doneKey });
	}

	writeBoard(board);

	// Progress'i 100 yap
	const meta = readMeta(PROJECT_ROOT);
	setMeta(meta, null, task.text, { progress: 100 });
	writeMeta(PROJECT_ROOT, meta);

	const fresh = readBoard();
	broadcast("board-changed", fresh);
	res.json({ success: true, board: fresh });
});

// GET /api/skills-list — agents + commands available for task assignment
app.get("/api/skills-list", (_req, res) => {
	const agentsDir = path.join(PROJECT_ROOT, ".claude/agents");
	const commandsDir = path.join(PROJECT_ROOT, ".claude/commands");
	let agents = [];
	let commands = [];
	try {
		agents = fs.readdirSync(agentsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
	} catch { /* ignore */ }
	try {
		commands = fs.readdirSync(commandsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", ""));
	} catch { /* ignore */ }
	res.json({ agents, commands });
});

// SSE
app.get("/events", (req, res) => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");
	res.flushHeaders();
	sseClients.add(res);
	res.write("event: connected\ndata: {}\n\n");
	req.on("close", () => sseClients.delete(res));
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
currentConfig = loadConfig(PROJECT_ROOT);
migrateIfNeeded();

watchConfig(PROJECT_ROOT, (newConfig) => {
	currentConfig = newConfig;
	broadcast("config-changed", newConfig);
	broadcast("board-changed", readBoard());
});

watchFile(TASKBOARD_PATH, "board-changed", readBoard);
watchFile(AUDIT_TRAIL_PATH, "activity-changed", readActivity);
watchFile(MEMORY_PATH, "status-changed", readStatus);
watchDirtyFlag();

app.listen(PORT, () => {
	console.log(`\n  Kalfa OS Kanban  →  http://localhost:${PORT}\n`);
});
