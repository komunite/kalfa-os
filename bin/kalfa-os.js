#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const TEMPLATE_ITEMS = [
	".claude",
	"CLAUDE.md",
];

function printHelp() {
	console.log(`Kalfa OS Komut Satırı Aracı

Usage:
  kalfa-os init [--target HEDEF_DIZIN] [--force] [--dry-run]
  kalfa-os --help

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

	args.command = input[0];

	for (let i = 1; i < input.length; i += 1) {
		const token = input[i];
		if (token === "--target") {
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
		} else if (token === "-h" || token === "--help") {
			args.help = true;
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
		const sourcePath = path.join(packageRoot, item);
		const destinationPath = path.join(targetRoot, item);
		copyRecursive(sourcePath, destinationPath, options, results);
	}

	const mode = options.dryRun ? "ÖNİZLEME" : "TAMAMLANDI";
	console.log(`[${mode}] Kalfa OS şu dizine kuruldu: ${targetRoot}`);
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
