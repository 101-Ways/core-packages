import { createSandbox } from 'sinon';
import * as core from '@101-ways/core-mongo-express';
import { strictEqual } from 'assert';

describe('index', () => {
  const sandbox = createSandbox();

  beforeEach(() => {
    const path = require.resolve('.');
    delete require.cache[path];
  });

  afterEach(sandbox.restore);

  it('should run the start function in production mode', () => {
    const spy = sandbox.stub(core, 'load');

    sandbox.define(process.env, 'NODE_ENV', 'production');

    require('.');
    strictEqual(spy.callCount, 1);
  });
});
