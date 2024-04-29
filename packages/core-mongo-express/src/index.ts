import { load as loadExpressCore } from '@101-ways/core-express';
import { load as loadMongoCore } from '@101-ways/core-mongo';
import { Registry } from './types';

export * from '@101-ways/core-express';
export * from '@101-ways/core-mongo';
export { config } from './modules/config';
export type { Registry };

export async function load<T extends Registry>(paths: string[] = [], sr?: T) {
  return loadMongoCore([], sr).then((sr2) =>
    loadExpressCore([`${__dirname}/modules`, ...paths], sr2),
  );
}
