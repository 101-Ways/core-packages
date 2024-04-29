# Example Bookmarks Service

An example Mongo / Express app. Other than the code in 'index.ts' to start the app all the rest of the code is business-logic and tests, free of boiler-plate.

The entire stack is loaded from one package: `@101-ways/core-mongo-express`. Out of the box this app comes with:

- Express app
- MongoDB client
- Structured logging (JSON with [ECS schema](https://www.elastic.co/guide/en/ecs/current/ecs-field-reference.html))
- Logging for Express requests and responses, including tracing data and response time
- Debug logging for Mongo queries, including tracing data and response time

## Starting the service locally

```bash
pnpm start:dev
```

[Bruno](https://www.usebruno.com/) API collection is in `bruno/` directory.

## Running tests

```bash
pnpm test
```

## Configuration environment variable defaults

```
HTTP_PORT ='8080'
LOG_LEVEL = 'info'
MONGO_DB = 'test'
MONGO_URI = 'mongodb://localhost:27017/test'
```

List of possible values for LOG_LEVEL: https://github.com/pinojs/pino/blob/main/docs/api.md#level-string
