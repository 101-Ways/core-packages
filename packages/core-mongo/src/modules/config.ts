import { config as coreConfig } from '@101-ways/core';

import { Registry } from '../types';

const { MONGO_DB = 'test', MONGO_URI = 'mongodb://localhost:27017/test' } =
  process.env;

export function $onBind(app: Registry) {
  app.config = config;
}

export const config = {
  ...coreConfig,
  mongo: {
    db: MONGO_DB,
    uri: MONGO_URI,
  },
};
