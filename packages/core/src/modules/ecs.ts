import type { Registry } from '../types';

export type PartialRegistry = {
  core: {
    timing: Pick<Registry['core']['timing'], 'makeTimerNs'>;
  };
};

export function $onBind(sr: Registry) {
  sr.ecs = new EcsModule(sr);
}

export class EcsModule {
  constructor(private sr: PartialRegistry) {}

  makeEventFn() {
    const timer = this.sr.core.timing.makeTimerNs();
    return (id: string) => ({ id, duration: timer() });
  }
}
