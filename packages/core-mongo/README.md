# @101-ways/core-mongo

[MongoDb](https://www.mongodb.com/) client accelerator package. It uses the Service Registry pattern to create a single object with APIs.

## Features

- starts server on port 8000 by default
- debug logging with tracing metadata

## Usage

```ts
import { load } from '@101-ways/core-mongo';

load([`${__dirname}/modules`]).then(async (sr) => {
  const collection = sr.mongo.db().collection('test');
  const list = await collection.find({}).toArray();
  console.log(list);
  sr.core.shutdown.run();
});
```

Basic example for creating a child package:

```ts
import { load as loadCore, type Registry } from '@101-ways/core-mongo';

export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], sr?: T) {
  return loadCore([`${__dirname}/modules`, ...paths], sr);
}
```

## Service Registry API

Everything in [@101-ways/core](../core/README.md) and

- sr.config - configuration (see [./src/modules/config.ts](./src/modules/config.ts))
- sr.mongo - MongoDB client (see https://mongodb.github.io/node-mongodb-native/6.5/classes/MongoClient.html)

## Environment Variables

Everything in [@101-ways/core](../core/README.md) and

- MONGO_URI='mongodb://localhost:27017/test' - Mongo connection URI
