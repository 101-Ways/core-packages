import type { Registry as ExpressRegistry } from '@101-ways/core-express';
import type { Registry as MongoRegistry } from '@101-ways/core-mongo';

export type Registry = MongoRegistry & ExpressRegistry;
