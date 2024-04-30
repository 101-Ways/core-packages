import { request } from 'undici';
import { strictEqual } from 'assert';
import { createSandbox } from 'sinon';
import * as core from '.';
import { ExpressModule } from './modules/express';

describe('index', () => {
  const port = 10001;
  const sandbox = createSandbox();
  const sr = {} as core.Registry;

  before(async () => {
    sandbox.replace(core.config.express, 'port', port);
    await core.load([], sr);
  });

  after((done) => {
    sr.core.shutdown.run(done);
  });

  it('should load core and own modules', async () => {
    strictEqual(sr.express instanceof ExpressModule, true);
    strictEqual(typeof sr.ctx.get, 'function');
    strictEqual(sr.config, core.config);
  });

  it('should start Express server on configured port', async () => {
    sr.express.app.get('/test', (_req, res) => {
      res.end('OK');
    });

    const res = await request(`http://127.0.0.1:${port}/test`, {
      method: 'GET',
    });
    strictEqual(res.statusCode, 200);

    const data = await res.body.text();
    strictEqual(data, 'OK');
  });
});
