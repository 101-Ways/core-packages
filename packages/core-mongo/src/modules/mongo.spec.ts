import { deepStrictEqual, strictEqual } from 'assert';
import type { CommandFailedEvent, CommandStartedEvent } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createSandbox } from 'sinon';
import { config, load, type Registry } from '..';

describe('modules/mongo', () => {
  const port = 10001;
  const sandbox = createSandbox();
  const sr = {} as Registry;

  before(async () => {
    sandbox.replace(config.mongo, 'uri', `mongodb://127.0.0.1:${port}/test`);
    await load([], sr);

    const mongod = await MongoMemoryServer.create({
      instance: { dbName: 'test', port },
    });

    sr.core.shutdown.add(__dirname, async () => {
      await mongod.stop();
    });
  });

  after((done) => {
    sr.core.shutdown.run(done);
  });

  afterEach(() => sandbox.restore());
  it('should provide a client to run queries against Mongo', async () => {
    const collection = sr.mongo.db().collection('items');

    await collection.insertOne({ foo: 'bar' });

    const items = await collection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    deepStrictEqual(items, [{ foo: 'bar' }]);
  });

  it('should log debug messages if run with async context', async () => {
    const mockCtx = { trace: {} };
    sandbox.stub(sr.ctx, 'get').returns(mockCtx);

    const spy = sandbox.spy(sr.log, 'debug');

    await sr.mongo.db().collection('items').find({}).toArray();

    const meta = spy.firstCall.args[0];
    strictEqual(meta.message, 'mongo response');
    strictEqual((meta.event as Record<string, unknown>).action, 'find');
    strictEqual(spy.callCount, 1);
  });

  it('should log error message when query fails if run with async context', async () => {
    const mockCtx = { mongoQueries: new Map(), trace: {} };
    sandbox.stub(sr.ctx, 'get').returns(mockCtx);

    const spy = sandbox.spy(sr.log, 'error');

    sr.mongo.emit('commandStarted', {
      command: {},
      commandName: 'find',
      requestId: 'foo',
    } as unknown as CommandStartedEvent);

    sr.mongo.emit('commandFailed', {
      failure: {},
      requestId: 'foo',
    } as unknown as CommandFailedEvent);

    const meta = spy.firstCall.args[0];
    strictEqual(meta.message, 'mongo error response');
    strictEqual((meta.event as Record<string, unknown>).action, 'find');
    strictEqual(spy.callCount, 1);
  });
});
