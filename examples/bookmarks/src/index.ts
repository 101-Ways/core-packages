import { config, load } from '@101-ways/core-mongo-express';
import type { Registry } from './types';

export { config, type Registry };

export async function start(sr?: Registry) {
  return load([`${__dirname}/modules`], sr);
}

if (process.env.NODE_ENV === 'production') {
  void start();
}
