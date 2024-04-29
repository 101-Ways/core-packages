import type {
  Context as CoreContext,
  Registry as CoreRegistry,
} from '@101-ways/core';
import type { MongoClient } from 'mongodb';
import type { config } from './modules/config';

export type Context = CoreContext & {
  mongoQueries?: Map<
    number,
    {
      cmd: string;
      collection: unknown;
      data: unknown;
      getEvent: ReturnType<Registry['ecs']['makeEventFn']>;
    }
  >;
};

export type Registry = CoreRegistry & {
  config: typeof config;
  mongo: MongoClient;
};
