import { request } from 'undici';
import { deepStrictEqual, strictEqual } from 'assert';
import { createSandbox } from 'sinon';
import { traceparent } from 'tctx';
import { config, load, type Registry } from '../..';
import { $onShutdown } from '.';

describe('index', () => {
  const port = 10001;
  const sandbox = createSandbox();
  const sr = {} as Registry;

  before(async () => {
    sandbox.replace(config.express, 'port', port);
    await load([], sr);
  });

  after((done) => {
    sr.core.shutdown.run(done);
  });

  afterEach(() => sandbox.restore());

  describe('sr.express.returnError()', () => {
    it('should log a warning log and return error', async () => {
      sr.express.app.get('/test', (req, res) => {
        sr.express.returnError(req, res, new Error('test'), 400);
      });

      const spy = sandbox.spy(sr.log, 'warn');

      const res = await request(`http://localhost:${port}/test`, {
        method: 'GET',
      });
      strictEqual(res.statusCode, 400);

      const data = await res.body.json();
      deepStrictEqual(data, {
        error: {
          message: 'Bad Request',
          cause: { message: 'test', name: 'Error' },
        },
      });

      const meta = spy.firstCall.args[0];
      strictEqual(meta.message, 'http error');
      strictEqual(spy.callCount, 1);
    });
  });

  describe('$onShutdown', () => {
    it('it should log a warning message if server close call return an error', async () => {
      const spy = sandbox.spy(sr.log, 'warn');

      sandbox.replace(sr.express.server, 'close', (callback) => {
        if (callback) {
          callback(new Error('test'));
        }
        return sr.express.server;
      });

      await $onShutdown(sr);

      const args = spy.firstCall.args[0];
      strictEqual((args.err as Record<string, unknown>).message, 'test');
      strictEqual(args.message, 'error closing express server');
      strictEqual(spy.callCount, 1);
    });
  });

  describe('tracing', () => {
    it('should use "traceparent" header if available on request', async () => {
      const tp = traceparent.make();

      sr.express.app.get('/trace-test', (_req, res) => {
        const trace = sr.ctx.get()?.trace;
        res.json({ traceId: trace?.traceId });
      });

      const res = await request(`http://localhost:${port}/trace-test`, {
        headers: { traceparent: tp.toString() },
        method: 'GET',
      });
      strictEqual(res.statusCode, 200);

      const data = await res.body.json();
      deepStrictEqual(data, { traceId: tp.trace_id });
    });

    it('should replace an invalid "traceparent" header on request', async () => {
      const tp = traceparent.make();

      sandbox.stub(traceparent, 'make').returns(tp);

      sr.express.app.get('/bad-trace-test', (_req, res) => {
        const trace = sr.ctx.get()?.trace;
        res.json({ traceId: trace?.traceId });
      });

      const res = await request(`http://localhost:${port}/bad-trace-test`, {
        headers: { traceparent: 'bad-trace' },
        method: 'GET',
      });
      strictEqual(res.statusCode, 200);

      const data = await res.body.json();
      deepStrictEqual(data, { traceId: tp.trace_id });
    });
  });
});
