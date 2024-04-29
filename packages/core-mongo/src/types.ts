import type { Registry as CoreRegistry } from '@101-ways/core';
import type { MongoClient } from 'mongodb';
import type { config } from './modules/config';

export type Registry = CoreRegistry & {
  config: typeof config;
  mongo: MongoClient;
};
