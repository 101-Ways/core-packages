import type { Registry as CoreRegistry } from '@101-ways/core';
import type { config } from './modules/config';
import type { ExpressModule } from './modules/express';

export type Registry = CoreRegistry & {
  config: typeof config;
  express: ExpressModule;
};
