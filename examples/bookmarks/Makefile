TS_FILES := $(shell find src/ -name '*.ts')

include ../../Common.mk

.PHONY: start-dev
start-dev: node_modules
	cd ../.. && make
	docker compose up -d
	NODE_ENV=production LOG_LEVEL=debug pnpm nodemon -w ./src ./src/index.ts;