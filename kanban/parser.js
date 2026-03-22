"use strict";

/**
 * Kalfa OS Kanban — TaskBoard.md Parser
 *
 * Desteklenen formatlar:
 *   Yeni format  → config'deki label'larla eşleşen ## heading'ler
 *   Eski format  → Bugün / Bu Hafta / Bekleyen İşler / Tamamlanan
 *
 * Liste marker: "*" (asterisk). Boş kolon sentinel: satırda tek "*"
 *   * [ ] task metni   → unchecked task
 *   * [x] task metni   → checked task
 *   *                  → boş kolon (yoksayılır)
 */

const LEGACY_HEADINGS = ["Bugün", "Bu Hafta", "Bekleyen İşler", "Tamamlanan"];

/** Eski formattaki kolonları yeni config kolonlarına map eder */
const LEGACY_MAP = {
	Bugün: "todo",
	"Bu Hafta": "task",
	"Bekleyen İşler": "task",
	Tamamlanan: null, // config'deki son kolona (done) gider
};

/**
 * Eski format olup olmadığını kontrol eder.
 * @param {string} rawText
 * @returns {boolean}
 */
function isMigratable(rawText) {
	return LEGACY_HEADINGS.some((h) => rawText.includes(`## ${h}`));
}

/**
 * Eski TaskBoard.md içeriğini yeni config yapısına dönüştürür.
 * @param {string} rawText
 * @param {object} config  — kanban-config.json içeriği
 * @returns {string}  — yeni format raw text
 */
function migrateBoard(rawText, config) {
	const parsed = _parseLegacy(rawText);
	// "done" key'ini config'in son kolonu olarak belirle
	const lastColumn = config.columns[config.columns.length - 1];
	const board = {};
	for (const col of config.columns) {
		board[col.key] = [];
	}

	for (const [legacyKey, tasks] of Object.entries(parsed)) {
		const targetKey = LEGACY_MAP[legacyKey];
		if (targetKey === null) {
			// Tamamlanan → son kolon
			board[lastColumn.key].push(...tasks);
		} else if (targetKey && board[targetKey] !== undefined) {
			board[targetKey].push(...tasks);
		} else {
			// Bilinmeyen → ilk kolon (task/backlog)
			board[config.columns[0].key].push(...tasks);
		}
	}

	return serialize({ columns: board }, config);
}

/**
 * Eski formattaki TaskBoard.md'yi parse eder.
 * @param {string} rawText
 * @returns {{ [legacyHeading: string]: Array<{text, checked}> }}
 */
function _parseLegacy(rawText) {
	const result = {};
	let current = null;
	for (const line of rawText.split("\n")) {
		const headingMatch = line.match(/^## (.+)/);
		if (headingMatch && LEGACY_HEADINGS.includes(headingMatch[1].trim())) {
			current = headingMatch[1].trim();
			result[current] = [];
			continue;
		}
		if (current === null) continue;
		const taskMatch = line.match(/^\* \[([ x])\] (.+)/);
		if (taskMatch) {
			result[current].push({
				text: taskMatch[2].trim(),
				checked: taskMatch[1] === "x",
			});
		}
	}
	return result;
}

/**
 * TaskBoard.md metnini parse eder ve board objesine dönüştürür.
 * @param {string} rawText
 * @param {object} config
 * @returns {{ columns: { [columnKey: string]: Array<{id, text, checked, columnKey}> } }}
 */
function parse(rawText, config) {
	// label → key lookup
	const labelToKey = {};
	for (const col of config.columns) {
		labelToKey[col.label.toLowerCase()] = col.key;
	}

	const columns = {};
	for (const col of config.columns) {
		columns[col.key] = [];
	}

	let currentKey = null;

	for (const line of rawText.split("\n")) {
		const headingMatch = line.match(/^## (.+)/);
		if (headingMatch) {
			const headingLabel = headingMatch[1].trim();
			currentKey = labelToKey[headingLabel.toLowerCase()] ?? null;
			continue;
		}
		if (currentKey === null) continue;
		const taskMatch = line.match(/^\* \[([ x])\] (.+)/);
		if (taskMatch) {
			columns[currentKey].push({
				text: taskMatch[2].trim(),
				checked: taskMatch[1] === "x",
			});
		}
	}

	// Assign positional IDs after parsing
	const columnsWithIds = {};
	for (const [key, tasks] of Object.entries(columns)) {
		columnsWithIds[key] = tasks.map((t, i) => ({
			id: `${key}-${i}`,
			text: t.text,
			checked: t.checked,
			columnKey: key,
		}));
	}

	return { columns: columnsWithIds };
}

/**
 * Board objesini TaskBoard.md formatına dönüştürür.
 * @param {{ columns: { [columnKey: string]: Array<{text, checked}> } }} board
 * @param {object} config
 * @returns {string}
 */
function serialize(board, config) {
	const lines = ["# Görev Panosu", ""];

	for (const col of config.columns) {
		lines.push(`## ${col.label}`, "");
		const tasks = board.columns[col.key] ?? [];
		if (tasks.length === 0) {
			lines.push("*");
		} else {
			for (const task of tasks) {
				const check = task.checked ? "x" : " ";
				lines.push(`* [${check}] ${task.text}`);
			}
		}
		lines.push("");
	}

	return lines.join("\n");
}

/**
 * Bir task'ı ID'sine göre bulur.
 * @param {{ columns: object }} board
 * @param {string} taskId  — örn. "todo-0"
 * @returns {{ task: object, columnKey: string, index: number } | null}
 */
function findTask(board, taskId) {
	for (const [columnKey, tasks] of Object.entries(board.columns)) {
		const index = tasks.findIndex((t) => t.id === taskId);
		if (index !== -1) {
			return { task: tasks[index], columnKey, index };
		}
	}
	return null;
}

module.exports = { parse, serialize, isMigratable, migrateBoard, findTask };
