import { strictEqual } from 'assert';
import * as core from '.';
import { CtxModule } from './modules/ctx';
import { EcsModule } from './modules/ecs';
import { UuidModule } from './modules/uuid';

describe('index', () => {
  it('should load core and own modules', async () => {
    const sr = await core.load();
    strictEqual(sr.ctx instanceof CtxModule, true);
    strictEqual(sr.ecs instanceof EcsModule, true);
    strictEqual(sr.uuid instanceof UuidModule, true);
    strictEqual(typeof sr.core.timing.makeTimerNs, 'function');
    strictEqual(sr.config, core.config);
    strictEqual(typeof sr.log.info, 'function');
  });
});
