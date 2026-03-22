const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);
const cliPath = path.resolve(__dirname, "..", "bin", "kalfa.js");

async function runCli(args = []) {
	return execFileAsync("node", [cliPath, ...args], {
		cwd: path.resolve(__dirname, ".."),
		env: process.env,
	});
}

test("prints help when no command is provided", async () => {
	const { stdout } = await runCli([]);
	assert.match(stdout, /Kalfa Komut Satırı Aracı/);
	assert.match(stdout, /kalfa init/);
});

test("supports `help` alias", async () => {
	const { stdout } = await runCli(["help"]);
	assert.match(stdout, /Kalfa Komut Satırı Aracı/);
	assert.match(stdout, /Seçenekler:/);
});

test("supports `--help` flag", async () => {
	const { stdout, stderr } = await runCli(["--help"]);
	assert.equal(stderr, "");
	assert.match(stdout, /Kalfa Komut Satırı Aracı/);
	assert.match(stdout, /Seçenekler:/);
});

test("fails for a non-existent target directory", async () => {
	const missingTarget = path.join(os.tmpdir(), "kalfa-missing-target-xyz");
	if (fs.existsSync(missingTarget)) {
		fs.rmSync(missingTarget, { recursive: true, force: true });
	}

	await assert.rejects(
		() => runCli(["init", "--target", missingTarget, "--dry-run"]),
		(error) => {
			const stderr = String(error.stderr || "");
			assert.match(stderr, /Hedef dizin bulunamadı/);
			return true;
		},
	);
});

test("dry-run initializes into an empty existing directory", async () => {
	const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "kalfa-dryrun-"));
	const { stdout } = await runCli(["init", "--target", targetDir, "--dry-run"]);

	assert.match(stdout, /\[ÖNİZLEME]/);
	assert.match(stdout, /Kopyalanan:/);
	assert.match(stdout, /Atlanan: 0/);
});

test("init copies starter files to target directory", async () => {
	const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "kalfa-init-"));
	const { stdout } = await runCli(["init", "--target", targetDir]);

	assert.match(stdout, /\[TAMAMLANDI]/);

	const expected = [
		".claude",
		"CLAUDE.md",
		".claude/workspace/Scratchpad.md",
		".claude/workspace/TaskBoard.md",
		".claude/workspace/DailyNotes",
	];

	for (const item of expected) {
		const absolute = path.join(targetDir, item);
		assert.equal(fs.existsSync(absolute), true, `missing ${absolute}`);
	}
});
