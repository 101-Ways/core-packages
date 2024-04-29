import { STATUS_CODES } from 'http';

export class ExpressError extends Error {
  cause: unknown;

  constructor(
    err: unknown,
    public statusCode = 500,
  ) {
    super(STATUS_CODES[statusCode]);
    this.cause = formatError(err);
    this.stack = trimStack(this.stack);
  }
}

export function makeError(err: unknown, statusCode?: number) {
  return new ExpressError(err, statusCode);
}

export function formatError(err: unknown) {
  const err2 = err as Record<string, unknown>;

  return typeof err === 'object'
    ? { ...err2, code: err2.code, name: err2.name, message: err2.message }
    : err;
}

export function trimStack(stack = '') {
  const lines = stack.split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    if ((lines[i] as string).includes('at Layer.handle ')) {
      return lines
        .slice(0, i + 1)
        .concat([' ...'])
        .join('\n');
    }
  }

  return stack;
}
