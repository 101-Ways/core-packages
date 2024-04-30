# @101-ways/core-express

[Express](https://expressjs.com/) server accelerator packages. It uses the Service Registry pattern to create a single object with APIs.

## Usage

```ts
import { load } from '@101-ways/core-express';

loadCore([`${__dirname}/modules`]).then((sr) => {
  console.log('SERVICE REGISTRY', sr);
});
```

Basic example for creating a child package:

```ts
import { load as loadCore, type Registry } from '@101-ways/core';

export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], sr?: T) {
  return loadCore([`${__dirname}/modules`, ...paths], sr);
}
```

## Service Registry API

Everything in [@101-ways/core](../core/README.md) and

- sr.config - configuration ([link](./src/modules/config.ts#14))
- sr.express - Express module methods
  - sr.express.app - Express app (see https://expressjs.com/en/4x/api.html#app)
  - sr.express.returnError(req, res, err, code?) - helper function to log and return an error
  - sr.express.server - HTTP server used by the app (see https://nodejs.org/api/http.html#class-httpserver)

## Environment Variables

Everything in [@101-ways/core](../core/README.md) and

- PORT='8000' - HTTP server port
