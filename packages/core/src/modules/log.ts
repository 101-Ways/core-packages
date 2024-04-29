import { getLogger } from '@borisovg/service-core';
import { Registry } from '../types';

export function $onBind(sr: Registry) {
  sr.log = getLogger();
}
