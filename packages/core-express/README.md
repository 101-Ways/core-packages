# @101-ways/core-express

[Express](https://expressjs.com/) server accelerator package. It uses the Service Registry pattern to create a single object with APIs.

## Features

- starts server on port 8000 by default
- request / response logging with tracing metadata
- [asynchronous context](https://nodejs.org/api/async_context.html) within request flow

## Usage

```ts
import { load } from '@101-ways/core-express';

load([`${__dirname}/modules`]).then((sr) => {
  sr.express.app.get('/hello', (req, res) => {
    res.json({ result: 'hello world' });
  });
});
```

Basic example for creating a child package:

```ts
import { load as loadCore, type Registry } from '@101-ways/express';

export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], sr?: T) {
  return loadCore([`${__dirname}/modules`, ...paths], sr);
}
```

## Service Registry API

Everything in [@101-ways/core](../core/README.md) and

- sr.config - configuration (see [./src/modules/config.ts](./src/modules/config.ts))
- sr.express - Express module methods
  - sr.express.app - Express app (see https://expressjs.com/en/4x/api.html#app)
  - sr.express.returnError(req, res, err, code?) - helper function to log and return an error
  - sr.express.server - HTTP server used by the app (see https://nodejs.org/api/http.html#class-httpserver)

## Environment Variables

Everything in [@101-ways/core](../core/README.md) and

- PORT='8000' - HTTP server port
