import { deepStrictEqual } from 'assert';
import { EcsModule, type PartialRegistry } from './ecs';

describe('modules/ecs', () => {
  describe('ecs.makeEventFn', () => {
    const DURATION = 10;

    const sr = {
      core: {
        timing: {
          makeTimerNs: () => () => {
            return DURATION;
          },
        },
      },
    } as PartialRegistry;

    it('should return a timer function that will return ECS event data', async () => {
      const mod = new EcsModule(sr);
      const fn = mod.makeEventFn();
      const data = fn('test');
      deepStrictEqual(data, { id: 'test', duration: DURATION });
    });
  });
});
