import type {
  CoreServiceRegistry as CoreRegistry,
  Logger,
} from '@borisovg/service-core';
import type { CtxModule } from './modules/ctx';
import type { config } from './modules/config';
import type { EcsModule } from './modules/ecs';
import type { UuidModule } from './modules/uuid';

export type Registry = CoreRegistry & {
  config: typeof config;
  ctx: CtxModule;
  ecs: EcsModule;
  log: Logger;
  uuid: UuidModule;
};
