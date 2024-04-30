# @101-ways/core

Base package for building accelerator packages. It uses the Service Registry pattern to create a single object with APIs.

## Usage

```ts
import { load } from '@101-ways/core';

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

- sr.config - configuration ([link](./src/modules/config.ts#14))
- sr.core - inherited from `@borisovg/service-core` package (see https://github.com/borisovg/node-service-core/blob/main/src/types.ts#L6)
- sr.ctx - [asynchronous context](https://nodejs.org/api/async_context.html) methods
  - sr.ctx.get() - get current context
  - sr.ctx.getTraceMeta() - get trace metadata from context in [ECS format](https://www.elastic.co/guide/en/ecs/current/ecs-tracing.html)
  - sr.ctx.toTraceMeta(ctx) - as above but using provided context
  - sr.ctx.run(fn) - run a function with async context
- sr.ecs - [ECS schema](https://www.elastic.co/guide/en/ecs/current/ecs-field-reference.html) methods
  - sr.ecs.makeEventFn() - returns a function that will in turn generate and ECS event object
- sr.log - logger methods
  - sr.log.debug(params)
  - sr.log.error(params)
  - sr.log.info(params)
  - sr.log.trace(params)
  - sr.log.warn(params)
- sr.uuid - UUID generation methods
  - sr.uuid.v4() - generate a UUIDv4 string
