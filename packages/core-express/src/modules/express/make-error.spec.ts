import { strictEqual } from 'assert';
import { ExpressError, makeError } from './make-error';

describe('modules/express/make-error', () => {
  it('should convert errors to an instance of ExpressError', () => {
    const err = makeError(new Error('test'));
    strictEqual(err instanceof ExpressError, true);
    strictEqual(err.message, 'Internal Server Error');
    strictEqual(err.statusCode, 500);

    const cause = err.cause as Record<string, unknown>;
    strictEqual(cause.message, 'test');
  });

  it('should accept and optional status code', () => {
    const err = makeError(new Error('test'), 404);
    strictEqual(err.message, 'Not Found');
    strictEqual(err.statusCode, 404);
  });

  it('should add original error to "cause" if it is not an object', () => {
    const err = makeError('test');
    strictEqual(err.cause, 'test');
  });
});
