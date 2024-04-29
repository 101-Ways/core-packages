import { strictEqual } from 'assert';
import * as core from '.';
import { MongoClientModule } from './modules/mongo';

describe('index', () => {
  const sr = {} as core.Registry;

  before(async () => {
    await core.load([], sr);
  });

  after((done) => {
    sr.core.shutdown.run(done);
  });

  it('should load core and own modules', async () => {
    strictEqual(sr.mongo instanceof MongoClientModule, true);
    strictEqual(typeof sr.core.timing.makeTimerNs, 'function');
    strictEqual(sr.config, core.config);
    strictEqual(typeof sr.log.info, 'function');
  });
});
