import { load as loadCore, setLogger } from '@borisovg/service-core';
import { logger } from './logger';
import { Context, Registry } from './types';

export { config } from './modules/config';
export type { Context, Registry };

export async function load<T extends Registry>(paths: string[] = [], sr?: T) {
  setLogger(logger);
  return loadCore([`${__dirname}/modules`, ...paths], sr);
}
