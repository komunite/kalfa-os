"use strict";

const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_CONFIGS = {
	software: {
		projectType: "software",
		columns: [
			{ key: "task", label: "Task", color: "#6366f1" },
			{ key: "todo", label: "Todo", color: "#f59e0b" },
			{ key: "in-progress", label: "In Progress", color: "#3b82f6" },
			{ key: "test", label: "Test", color: "#8b5cf6" },
			{ key: "uat", label: "UAT", color: "#f97316" },
			{ key: "done", label: "Done", color: "#10b981", isDone: true },
		],
	},
	content: {
		projectType: "content",
		columns: [
			{ key: "idea", label: "Fikir", color: "#6366f1" },
			{ key: "writing", label: "Yazıyor", color: "#f59e0b" },
			{ key: "editing", label: "Düzenleme", color: "#3b82f6" },
			{ key: "published", label: "Yayında", color: "#10b981", isDone: true },
		],
	},
	general: {
		projectType: "general",
		columns: [
			{ key: "backlog", label: "Backlog", color: "#6366f1" },
			{ key: "todo", label: "Yapılacak", color: "#f59e0b" },
			{ key: "in-progress", label: "Devam Ediyor", color: "#3b82f6" },
			{ key: "done", label: "Tamamlandı", color: "#10b981", isDone: true },
		],
	},
};

function detectProjectType(projectRoot) {
	try {
		const files = fs.readdirSync(projectRoot);
		const codeMarkers = [
			"package.json",
			"tsconfig.json",
			"Cargo.toml",
			"go.mod",
			"pom.xml",
			"build.gradle",
			"requirements.txt",
			"pyproject.toml",
			"Makefile",
			"Dockerfile",
		];
		if (files.some((f) => codeMarkers.includes(f))) {
			return "software";
		}
		// Content project: mostly .md files, no code markers
		const mdCount = files.filter((f) => f.endsWith(".md")).length;
		if (mdCount > 3) {
			return "content";
		}
	} catch {
		// ignore
	}
	return "general";
}

function loadConfig(projectRoot) {
	const configPath = path.join(projectRoot, ".claude/kanban-config.json");
	if (fs.existsSync(configPath)) {
		try {
			return JSON.parse(fs.readFileSync(configPath, "utf8"));
		} catch {
			console.warn("[config] kanban-config.json parse hatası, default kullanılıyor");
		}
	}
	const type = detectProjectType(projectRoot);
	const config = DEFAULT_CONFIGS[type];
	try {
		fs.mkdirSync(path.join(projectRoot, ".claude"), { recursive: true });
		fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
		console.log(`[config] ${type} tipi tespit edildi, kanban-config.json oluşturuldu`);
	} catch (e) {
		console.warn("[config] kanban-config.json yazılamadı:", e.message);
	}
	return config;
}

/**
 * Watches kanban-config.json for changes and calls onChange(newConfig).
 * Returns a cleanup function.
 */
function watchConfig(projectRoot, onChange) {
	const configPath = path.join(projectRoot, ".claude/kanban-config.json");
	let debounceTimer = null;

	function tryWatch() {
		if (!fs.existsSync(configPath)) {
			// Retry after 2s in case the file is created later
			setTimeout(tryWatch, 2000);
			return;
		}
		const watcher = fs.watch(configPath, () => {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				try {
					const newConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
					console.log("[config] kanban-config.json değişti, reload ediliyor");
					onChange(newConfig);
				} catch {
					// invalid JSON mid-write, ignore
				}
			}, 150);
		});
		watcher.on("error", () => {
			// File may have been deleted/replaced; retry
			setTimeout(tryWatch, 500);
		});
	}

	tryWatch();
}

module.exports = { loadConfig, watchConfig, DEFAULT_CONFIGS };
