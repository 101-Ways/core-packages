import { AsyncLocalStorage } from 'async_hooks';
import { Context, Registry } from '../types';

export function $onBind(sr: Registry) {
  sr.ctx = new CtxModule();
}

export class CtxModule<T extends Context> {
  private als: AsyncLocalStorage<unknown>;

  constructor() {
    this.als = new AsyncLocalStorage<T>();
  }

  get<C extends T>() {
    return this.als.getStore() as C | undefined;
  }

  getTraceMeta() {
    const ctx = this.get();
    if (ctx) {
      return this.toTraceMeta(ctx);
    }
  }

  toTraceMeta(ctx: T) {
    return { trace: { id: ctx.trace.traceId }, span: { id: ctx.trace.spanId } };
  }

  run(fn: () => unknown) {
    this.als.run({ trace: {} }, fn);
  }
}
