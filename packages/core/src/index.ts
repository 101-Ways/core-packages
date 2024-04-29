import { load as loadCore, setLogger } from '@borisovg/service-core';
import { logger } from './logger';
import { Registry } from './types';

export { config } from './modules/config';
export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], app?: T) {
  setLogger(logger);
  return loadCore([`${__dirname}/modules`, ...paths], app);
}
