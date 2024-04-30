import { config as coreConfig } from '@101-ways/core';

import { Registry } from '../types';

const { MONGO_URI = 'mongodb://localhost:27017/test' } = process.env;

export function $onBind(sr: Registry) {
  sr.config = config;
}

export const config = {
  ...coreConfig,
  mongo: {
    uri: MONGO_URI,
  },
};
