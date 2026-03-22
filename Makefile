.PHONY: help install test test-watch lint lint-fix format format-check check clean pack init

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	bun install

test: ## Run tests
	bun run test

test-watch: ## Run tests in watch mode
	bun run test:watch

lint: ## Run all linters (biome + remark)
	bun run lint

lint-fix: ## Auto-fix lint issues
	bun run lint:fix
	bun run lint:md:fix

format: ## Format all files
	bun run format

format-check: ## Check formatting without writing
	bun run format:check

check: ## Run all checks (lint + format)
	bun run check

clean: ## Remove generated files
	rm -rf node_modules bun.lockb

pack: ## Preview npm package contents
	bun run pack:preview

init: ## Run kalfa init (dry-run)
	bun run cli init --dry-run
