"use strict";

/**
 * Kanban task metadata — priority, note, progress.
 * Stored in .claude/kanban-meta.json, keyed by composite `${id}::${text}`.
 * This prevents collisions when two tasks share the same text.
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

/** Build the storage key for a task. */
function makeKey(id, text) {
	return `${id}::${text}`;
}

/**
 * Get metadata for a task by composite key.
 * Falls back to plain-text key for legacy entries (pre-composite migration).
 */
function getMeta(meta, id, text) {
	const key = makeKey(id, text);
	if (meta[key] !== undefined) return { ...DEFAULTS, ...meta[key] };
	// Legacy fallback: entries written before composite-key support
	if (meta[text] !== undefined) return { ...DEFAULTS, ...meta[text] };
	return { ...DEFAULTS };
}

/**
 * Set or update metadata for a task.
 * Migrates from oldId::oldText → newId::newText when either changes.
 * Also cleans up any legacy plain-text entry for the same task.
 */
function setMeta(meta, oldId, newId, oldText, newText, data) {
	const oldKey = oldId ? makeKey(oldId, oldText) : null;
	const newKey = makeKey(newId, newText);

	if (oldKey && oldKey !== newKey) {
		// Task was renamed or moved — migrate existing data to new key
		const existing = meta[oldKey] ?? meta[oldText] ?? {};
		meta[newKey] = { ...existing, ...data };
		delete meta[oldKey];
		delete meta[oldText]; // clean up any legacy plain-text entry
	} else {
		// Same key — merge, and clean up any legacy plain-text entry
		const existing = meta[newKey] ?? meta[newText] ?? {};
		meta[newKey] = { ...existing, ...data };
		if (newText !== newKey && meta[newText] !== undefined) delete meta[newText];
	}
	return meta;
}

/** Delete metadata for a task (by composite key and legacy plain-text key). */
function deleteMeta(meta, id, text) {
	delete meta[makeKey(id, text)];
	delete meta[text]; // clean up any legacy plain-text entry
	return meta;
}

module.exports = { readMeta, writeMeta, getMeta, setMeta, deleteMeta };
