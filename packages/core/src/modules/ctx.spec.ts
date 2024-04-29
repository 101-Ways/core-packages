import { deepStrictEqual, strictEqual } from 'assert';
import { CtxModule } from './ctx';

describe('modules/ctx', () => {
  const mod = new CtxModule();

  describe('sr.ctx.run()', () => {
    it('should create and async context', async () => {
      await mod.run(async () => {
        return (async () => {
          const ctx = mod.get();
          deepStrictEqual(ctx?.trace, {});
          ctx.trace.traceId = 'foo';
        })().then(() => {
          const ctx = mod.get();
          deepStrictEqual(ctx?.trace.traceId, 'foo');
        });
      });

      await mod.run(async () => {
        return (async () => {
          const ctx = mod.get();
          deepStrictEqual(ctx?.trace, {});
          ctx.trace.traceId = 'foo';
        })().then(() => {
          const ctx = mod.get();
          deepStrictEqual(ctx?.trace.traceId, 'foo');
        });
      });
    });

    it('should have a separate context for each run', async () => {
      strictEqual(mod.get(), undefined);

      await mod.run(async () => {
        deepStrictEqual(mod.get(), { trace: {} });
      });
    });
  });

  describe('sr.ctx.getTraceMeta()', () => {
    it('should return trace metadata for logging', (done) => {
      const mod = new CtxModule();

      mod.run(async () => {
        try {
          await (() => {
            const ctx = mod.get();
            deepStrictEqual(ctx?.trace, {});
            ctx.trace.traceId = 'foo';
            ctx.trace.spanId = 'bar';
          })();

          await (() => {
            const meta = mod.getTraceMeta();
            deepStrictEqual(meta, {
              trace: { id: 'foo' },
              span: { id: 'bar' },
            });
          })();
        } catch (e) {
          done(e);
        }

        done();
      });
    });
  });
});
