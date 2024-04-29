import { config as coreConfig } from '@101-ways/core';

import { Registry } from '../types';

const { HTTP_PORT = '8000' } = process.env;

export function $onBind(app: Registry) {
  app.config = config;
}

export const config = {
  ...coreConfig,
  express: {
    staticDir: './public',
    port: parseInt(HTTP_PORT, 10),
  },
};
