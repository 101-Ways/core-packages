all: build

build lint test: node_modules
	pnpm run -r --stream=true $@

node_modules: package.json
	pnpm install || (rm -rf $@; exit 1)
	test -d $@ && touch $@ || true
