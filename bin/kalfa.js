#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const figlet = require("figlet");

const GITIGNORE_BLOCK_START = "# >>> Kalfa runtime artifacts >>>";
const GITIGNORE_BLOCK_END = "# <<< Kalfa runtime artifacts <<<";
const TEMPLATE_ITEMS = [
	{ source: ".claude", destination: ".claude", strategy: "copy" },
	{ source: "CLAUDE.md", destination: "CLAUDE.md", strategy: "copy" },
	{ source: "templates/gitignore", destination: ".gitignore", strategy: "merge-gitignore" },
];

function printBanner() {
	const banner = figlet.textSync("KALFA", { font: "Block" });
	console.log(`\x1b[38;2;217;119;87m${banner}\x1b[0m`);
}

function printHelp() {
	printBanner();
	console.log(`Kalfa Komut Satırı Aracı

Usage:
  kalfa init [--target HEDEF_DIZIN] [--force] [--dry-run]
  kalfa --help

Seçenekler:
  --target HEDEF_DIZIN  Hedef proje dizini (varsayılan: mevcut dizin)
  --force          Mevcut dosyaların üzerine yaz
  --dry-run        Dosya yazmadan yapılacak işlemleri göster
  -h, --help       Yardımı göster
`);
}

function parseArgs(argv) {
	const args = {
		command: null,
		target: process.cwd(),
		force: false,
		dryRun: false,
		help: false,
	};

	const input = argv.slice(2);
	if (input.length === 0) return args;

	for (let i = 0; i < input.length; i += 1) {
		const token = input[i];
		if (token === "-h" || token === "--help") {
			args.help = true;
		} else if (args.command === null) {
			args.command = token;
		} else if (token === "--target") {
			const value = input[i + 1];
			if (!value) {
				throw new Error("--target için bir değer verilmedi");
			}
			args.target = path.resolve(value);
			i += 1;
		} else if (token === "--force") {
			args.force = true;
		} else if (token === "--dry-run") {
			args.dryRun = true;
		} else {
			throw new Error(`Bilinmeyen seçenek: ${token}`);
		}
	}

	return args;
}

function ensureDir(dirPath, dryRun) {
	if (dryRun) return;
	fs.mkdirSync(dirPath, { recursive: true });
}

function copyRecursive(sourcePath, destinationPath, options, results) {
	const { force, dryRun } = options;

	if (!fs.existsSync(sourcePath)) {
		results.missing.push(sourcePath);
		return;
	}

	const stat = fs.statSync(sourcePath);

	if (stat.isDirectory()) {
		if (!fs.existsSync(destinationPath)) {
			results.createdDirs.push(destinationPath);
			ensureDir(destinationPath, dryRun);
		}

		const entries = fs.readdirSync(sourcePath);
		for (const entry of entries) {
			const childSource = path.join(sourcePath, entry);
			const childDestination = path.join(destinationPath, entry);
			copyRecursive(childSource, childDestination, options, results);
		}
		return;
	}

	if (fs.existsSync(destinationPath) && !force) {
		results.skipped.push(destinationPath);
		return;
	}

	ensureDir(path.dirname(destinationPath), dryRun);
	results.copied.push(destinationPath);

	if (!dryRun) {
		fs.copyFileSync(sourcePath, destinationPath);
	}
}

function normalizeContent(content) {
	return content.replace(/\r\n/g, "\n");
}

function ensureTrailingNewline(content) {
	if (content.length === 0) return "";
	return content.endsWith("\n") ? content : `${content}\n`;
}

function readGitignoreEntries(sourcePath) {
	return normalizeContent(fs.readFileSync(sourcePath, "utf8"))
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0 && !line.startsWith("#"));
}

function stripManagedGitignoreBlock(content) {
	const normalized = normalizeContent(content);
	const lines = normalized.split("\n");
	const start = lines.indexOf(GITIGNORE_BLOCK_START);
	const end = lines.indexOf(GITIGNORE_BLOCK_END);

	if (start === -1 || end === -1 || end < start) {
		return { content: normalized, hasBlock: false };
	}

	const nextLines = [...lines.slice(0, start), ...lines.slice(end + 1)];
	return {
		content: nextLines.join("\n").replace(/\n{3,}/g, "\n\n"),
		hasBlock: true,
	};
}

function buildGitignoreBlock(entries) {
	if (entries.length === 0) return "";
	return [
		GITIGNORE_BLOCK_START,
		...entries,
		GITIGNORE_BLOCK_END,
		"",
	].join("\n");
}

function appendGitignoreBlock(content, entries) {
	const normalized = ensureTrailingNewline(normalizeContent(content).trimEnd());
	const block = buildGitignoreBlock(entries);

	if (!block) {
		return normalized;
	}

	if (!normalized) {
		return block;
	}

	return `${normalized}\n${block}`;
}

function mergeGitignore(sourcePath, destinationPath, options, results) {
	const { force, dryRun } = options;

	if (!fs.existsSync(sourcePath)) {
		results.missing.push(sourcePath);
		return;
	}

	const desiredEntries = readGitignoreEntries(sourcePath);
	const destinationExists = fs.existsSync(destinationPath);

	if (!destinationExists) {
		results.copied.push(destinationPath);
		if (!dryRun) {
			fs.writeFileSync(destinationPath, buildGitignoreBlock(desiredEntries));
		}
		return;
	}

	const existingContent = normalizeContent(fs.readFileSync(destinationPath, "utf8"));
	const { content: baseContent, hasBlock } = stripManagedGitignoreBlock(existingContent);

	if (hasBlock && !force) {
		results.skipped.push(destinationPath);
		return;
	}

	const existingEntries = new Set(
		baseContent
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0 && !line.startsWith("#")),
	);
	const missingEntries = desiredEntries.filter((entry) => !existingEntries.has(entry));
	const nextContent = appendGitignoreBlock(baseContent, missingEntries);
	const normalizedExisting = ensureTrailingNewline(existingContent.trimEnd());

	if (nextContent === normalizedExisting) {
		results.skipped.push(destinationPath);
		return;
	}

	results.copied.push(destinationPath);
	if (!dryRun) {
		fs.writeFileSync(destinationPath, nextContent);
	}
}

function runInit(options) {
	const packageRoot = path.resolve(__dirname, "..");
	const targetRoot = path.resolve(options.target);
	const results = {
		copied: [],
		skipped: [],
		createdDirs: [],
		missing: [],
	};

	if (!fs.existsSync(targetRoot)) {
		throw new Error(`Hedef dizin bulunamadı: ${targetRoot}`);
	}

	for (const item of TEMPLATE_ITEMS) {
		const sourcePath = path.join(packageRoot, item.source);
		const destinationPath = path.join(targetRoot, item.destination);
		if (item.strategy === "merge-gitignore") {
			mergeGitignore(sourcePath, destinationPath, options, results);
			continue;
		}
		copyRecursive(sourcePath, destinationPath, options, results);
	}

	const mode = options.dryRun ? "ÖNİZLEME" : "TAMAMLANDI";
	console.log(`[${mode}] Kalfa şu dizine kuruldu: ${targetRoot}`);
	console.log(`Kopyalanan: ${results.copied.length}`);
	console.log(`Atlanan: ${results.skipped.length}`);
	console.log(`Oluşturulan dizin: ${results.createdDirs.length}`);

	if (results.skipped.length > 0) {
		console.log("\nMevcut olduğu için atlanan dosya/dizinler:");
		for (const p of results.skipped.slice(0, 20)) {
			console.log(`- ${p}`);
		}
		if (results.skipped.length > 20) {
			console.log(`... ve ${results.skipped.length - 20} adet daha`);
		}
	}

	if (results.missing.length > 0) {
		console.log("\nPaket içinde bulunamayan şablon öğeleri:");
		for (const p of results.missing) {
			console.log(`- ${p}`);
		}
	}

	if (!options.dryRun) {
		console.log("\nSonraki adım:");
		console.log("- Projenizde `claude` çalıştırıp `/start` komutunu kullanın.");
	}
}

function main() {
	let args;
	try {
		args = parseArgs(process.argv);
	} catch (error) {
		console.error(`Hata: ${error.message}`);
		printHelp();
		process.exit(1);
	}

	if (args.command === "help") {
		printHelp();
		return;
	}

	if (args.help || !args.command) {
		printHelp();
		return;
	}

	if (args.command !== "init") {
		console.error(`Bilinmeyen komut: ${args.command}`);
		printHelp();
		process.exit(1);
	}

	try {
		runInit(args);
	} catch (error) {
		console.error(`Hata: ${error.message}`);
		process.exit(1);
	}
}

main();
