EXAMPLES := $(shell find examples/* -maxdepth 0 -type d)
PACKAGES := $(shell find packages/* -maxdepth 0 -type d)

all: build

build lint test: node_modules
	for D in $(PACKAGES) $(EXAMPLES); do \
		cd $$D && make $@ || exit 1; \
		cd ../..; \
		done

node_modules: package.json
	pnpm install || (rm -rf $@; exit 1)
	test -d $@ && touch $@ || true