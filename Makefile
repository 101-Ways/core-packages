PACKAGES := $(shell find packages/* -maxdepth 0 -type d)

all: build

build: node_modules
	for D in $(PACKAGES); do pushd $$D; make || exit 1; popd; done

node_modules: package.json
	pnpm install || (rm -rf $@; exit 1)
	test -d $@ && touch $@ || true

lint: node_modules
	for D in $(PACKAGES); do pushd $$D; make lint || exit 1; popd; done

test: node_modules
	for D in $(PACKAGES); do pushd $$D; make test || exit 1; popd; done