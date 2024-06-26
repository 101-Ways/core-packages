import { config as expressConfig } from '@101-ways/core-express';
import { config as mongoConfig } from '@101-ways/core-mongo';

import { Registry } from '../types';

export function $onBind(sr: Registry) {
  sr.config = config;
}

export const config = {
  ...mongoConfig,
  ...expressConfig,
};
