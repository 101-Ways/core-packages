import { deepStrictEqual, strictEqual } from 'assert';
import { config, start, type Registry } from '../..';
import { createSandbox } from 'sinon';
import { HttpClient } from '../../test-http-client.spec';

describe('modules/api/create', () => {
  const sr = {} as Registry;
  const client = new HttpClient({ port: 10001 });
  const sandbox = createSandbox();
  const mockCollection = {
    deleteOne: sandbox.stub(),
    insertOne: sandbox.stub(),
    find: sandbox.stub(),
  };

  before(async () => {
    sandbox.replace(config.express, 'port', client.port);
    await start(sr);
  });

  beforeEach(() => {
    sandbox.replace(
      sr.bookmarks,
      'collection',
      mockCollection as unknown as typeof sr.bookmarks.collection,
    );
  });

  after(() => sr.core.shutdown.run());

  afterEach(sandbox.restore);

  const data = { title: 'test-title', url: 'http://example.com' };

  it('should add a bookmark', async () => {
    const uuid = 'test-uuid';
    sandbox.stub(sr.uuid, 'v4').returns(uuid);

    const { body, statusCode } = await client.post('/api/bookmarks', data);
    strictEqual(statusCode, 200);
    deepStrictEqual(await body.json(), { result: { uuid } });

    const spy = mockCollection.insertOne;
    strictEqual(spy.callCount, 1);
    deepStrictEqual(spy.firstCall.args[0], { ...data, uuid });
  });

  it('should return 400 if request validation fails', async () => {
    const { statusCode } = await client.post('/api/bookmarks', {
      ...data,
      url: '',
    });
    strictEqual(statusCode, 400);
  });

  it('should return 500 if model call throws an error', async () => {
    sandbox.stub(sr.bookmarks, 'create').throws('Test Error');

    const { statusCode } = await client.post('/api/bookmarks', data);
    strictEqual(statusCode, 500);
  });
});
