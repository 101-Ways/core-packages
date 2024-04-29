import { load as loadCore } from '@101-ways/core';
import { Registry } from './types';

export type { Collection } from 'mongodb';
export { config } from './modules/config';
export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], sr?: T) {
  return loadCore([`${__dirname}/modules`, ...paths], sr);
}
