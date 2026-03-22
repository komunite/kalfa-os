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
		".gitignore",
		".claude/workspace/Scratchpad.md",
		".claude/workspace/TaskBoard.md",
		".claude/workspace/DailyNotes",
	];

	for (const item of expected) {
		const absolute = path.join(targetDir, item);
		assert.equal(fs.existsSync(absolute), true, `missing ${absolute}`);
	}

	const gitignore = fs.readFileSync(path.join(targetDir, ".gitignore"), "utf8");
	assert.match(gitignore, /# >>> Kalfa runtime artifacts >>>/);
	assert.match(gitignore, /^\.claude\/logs\/$/m);
	assert.match(gitignore, /^\.claude\/agent-memory\/$/m);
	assert.match(gitignore, /# <<< Kalfa runtime artifacts <<</);
});

test("init appends a managed gitignore block without clobbering existing rules", async () => {
	const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "kalfa-gitignore-existing-"));
	const targetGitignore = path.join(targetDir, ".gitignore");
	fs.writeFileSync(targetGitignore, "node_modules/\n.env\n");

	await runCli(["init", "--target", targetDir]);

	const gitignore = fs.readFileSync(targetGitignore, "utf8");
	assert.match(gitignore, /^node_modules\/$/m);
	assert.match(gitignore, /^\.env$/m);
	assert.match(gitignore, /^\.claude\/logs\/$/m);
	assert.equal((gitignore.match(/# >>> Kalfa runtime artifacts >>>/g) || []).length, 1);
});

test("init does not duplicate the managed gitignore block on repeated runs", async () => {
	const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "kalfa-gitignore-repeat-"));

	await runCli(["init", "--target", targetDir]);
	await runCli(["init", "--target", targetDir]);

	const gitignore = fs.readFileSync(path.join(targetDir, ".gitignore"), "utf8");
	assert.equal((gitignore.match(/# >>> Kalfa runtime artifacts >>>/g) || []).length, 1);
});

test("init --force refreshes only the managed gitignore block", async () => {
	const targetDir = fs.mkdtempSync(path.join(os.tmpdir(), "kalfa-gitignore-force-"));
	const targetGitignore = path.join(targetDir, ".gitignore");
	fs.writeFileSync(
		targetGitignore,
		[
			"node_modules/",
			"# >>> Kalfa runtime artifacts >>>",
			".claude/logs/",
			"legacy-rule",
			"# <<< Kalfa runtime artifacts <<<",
			"",
		].join("\n"),
	);

	await runCli(["init", "--target", targetDir, "--force"]);

	const gitignore = fs.readFileSync(targetGitignore, "utf8");
	assert.match(gitignore, /^node_modules\/$/m);
	assert.doesNotMatch(gitignore, /^legacy-rule$/m);
	assert.match(gitignore, /^\.claude\/logs\/$/m);
	assert.match(gitignore, /^\.claude\/agent-memory\/$/m);
	assert.equal((gitignore.match(/# >>> Kalfa runtime artifacts >>>/g) || []).length, 1);
});
