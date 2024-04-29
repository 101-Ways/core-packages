import type { Registry } from '../types';

export function $onBind(app: Registry) {
  app.ecs = new EcsModule(app);
}

export class EcsModule {
  constructor(private app: Registry) {}

  makeEventFn() {
    const timer = this.app.core.timing.makeTimerNs();
    return (id: string) => ({ id, duration: timer() });
  }
}
