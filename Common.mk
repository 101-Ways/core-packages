MOCHA_OPTS := --bail

all: dist
	
.PHONY: build
build: dist
	
.PHONY: clean
clean:
	rm -rf coverage dist node_modules

dist: $(TS_FILES) tsconfig.json tsconfig-build.json Makefile
	pnpm tsc -p tsconfig-build.json && touch $@

.PHONY: lint
lint: node_modules
	pnpm prettier --check 'src/**/*.{js,ts,json,md,yml}'
	pnpm eslint src/ --max-warnings 0

node_modules: package.json
	pnpm install || (rm -rf $@; exit 1)
	test -d $@ && touch $@ || true

.PHONY: test
test:
	cd ../.. && make
	pnpm c8 --reporter=none ts-mocha $(MOCHA_OPTS) 'src/**/*.spec.ts' \
		&& pnpm c8 report --all --clean -n src -x 'src/**/*.spec.ts' -x 'src/types.*' --reporter=text
