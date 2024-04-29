import { config as coreConfig } from '@borisovg/service-core';

import type { LoggerOptions } from 'pino';
import { Registry } from '../types';

const { LOG_LEVEL = 'info' } = process.env;

const pinoOptions: LoggerOptions = {};

export function $onBind(app: Registry) {
  app.config = config;
}

export const config = {
  ...coreConfig,
  logger: {
    ecsConfig: {},
    level: LOG_LEVEL,
    pinoOptions,
  },
};
