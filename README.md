# core-packages

This is a repository for the Node.js accelerator packages PoC.
The idea is to build a set of packages that encapsulate backend stack and operational plumbing.

Please see [this post](https://gir.me.uk/posts/low-boilerplate-nodejs-services.html) for more details on the philosophy behind this approach.

## Repository structure

This repository is presented as a PNPM workspace.

```
├── .github
│   └── workflows   # CI scripts
├── examples        # Example apps
│   └── bookmarks
└── packages        # NPM packages
    ├── core
    ├── core-express
    ├── core-mongo
    └── core-mongo-express
```

The packages were intentionally made quite granular so as to demonstrate the possibility of mixing and matching technologies for different customer requirements.
As an extension of the PoC we could, for example, add packages for Fastify and PostgreSQL and combinations.

## Testing

Run `pnpm test` at the root level (for all packages) or in the individual package directories.

## Publishing packages to NPM

Please run [this workflow](https://github.com/101-Ways/core-packages/actions/workflows/publish.yaml) to publish updates.
