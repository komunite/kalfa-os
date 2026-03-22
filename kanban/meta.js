"use strict";

/**
 * Kanban task metadata — priority, note, progress.
 * Stored in .claude/kanban-meta.json, keyed by task text.
 * TaskBoard.md remains the source of truth for task existence.
 */

const fs = require("node:fs");
const path = require("node:path");

const DEFAULTS = { priority: null, note: "", progress: 0, skill: null, testScenarios: [] };

function metaPath(projectRoot) {
	return path.join(projectRoot, ".claude/kanban-meta.json");
}

function readMeta(projectRoot) {
	const p = metaPath(projectRoot);
	if (!fs.existsSync(p)) return {};
	try {
		return JSON.parse(fs.readFileSync(p, "utf8"));
	} catch {
		return {};
	}
}

function writeMeta(projectRoot, meta) {
	const p = metaPath(projectRoot);
	fs.mkdirSync(path.dirname(p), { recursive: true });
	fs.writeFileSync(p, JSON.stringify(meta, null, 2), "utf8");
}

/** Get metadata for a task text, with defaults applied. */
function getMeta(meta, text) {
	return { ...DEFAULTS, ...(meta[text] ?? {}) };
}

/** Set or update metadata for a task. Cleans up if old text differs. */
function setMeta(meta, oldText, newText, data) {
	if (oldText && oldText !== newText && meta[oldText]) {
		meta[newText] = { ...meta[oldText], ...data };
		delete meta[oldText];
	} else {
		meta[newText] = { ...(meta[newText] ?? DEFAULTS), ...data };
	}
	return meta;
}

function deleteMeta(meta, text) {
	delete meta[text];
	return meta;
}

module.exports = { readMeta, writeMeta, getMeta, setMeta, deleteMeta };
