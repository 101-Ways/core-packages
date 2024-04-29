import { strictEqual } from 'assert';
import * as core from '.';

describe('index', () => {
  const sr = {} as core.Registry;

  before(async () => {
    await core.load([], sr);
  });

  after((done) => {
    sr.core.shutdown.run(done);
  });

  it('should load own and parent modules', async () => {
    strictEqual(sr.config, core.config);
    strictEqual(typeof sr.core.timing.makeTimerNs, 'function');
    strictEqual(typeof sr.express.app.get, 'function');
    strictEqual(typeof sr.log.info, 'function');
    strictEqual(typeof sr.mongo.db, 'function');
  });
});
