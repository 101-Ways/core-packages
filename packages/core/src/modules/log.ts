import { getLogger } from '@borisovg/service-core';
import { Registry } from '../types';

export function $onBind(app: Registry) {
  app.log = getLogger();
}
