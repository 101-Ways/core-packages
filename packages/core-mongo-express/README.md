# @101-ways/core-mongo-express

Express + MongoDB accelerator package. It uses the Service Registry pattern to create a single object with APIs.

## Usage

```ts
import { load } from '@101-ways/core-mongo-express';

load([`${__dirname}/modules`]).then((sr) => {
  const collection = sr.mongo.db().collection('test');

  sr.express.app.get('/hello', async (req, res) => {
    const results = await collection.find({}).toArray();
    res.json({ results });
  });
});
```

## Service Registry API

Combination of [@101-ways/core-express](../core-express/README.md) and [@101-ways/core-mongo](../core-mongo/README.md).

## Environment Variables

Combination of [@101-ways/core-express](../core-express/README.md) and [@101-ways/core-mongo](../core-mongo/README.md).
