import { v4 } from 'uuid';
import { Registry } from '../types';

export async function $onBind(sr: Registry) {
  sr.uuid = new UuidModule();
}

export class UuidModule {
  v4: () => string;

  constructor() {
    this.v4 = v4;
  }
}
