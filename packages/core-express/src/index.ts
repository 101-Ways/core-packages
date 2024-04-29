import { load as loadCore } from '@101-ways/core';
import { Registry } from './types';

export type { Handler, Request, Response } from 'express';
export { config } from './modules/config';
export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], app?: T) {
  return loadCore([`${__dirname}/modules`, ...paths], app);
}
