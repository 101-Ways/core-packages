import type { Request, Response } from 'express';
import { Registry } from '../../types';

export type PartialRegistry = {
  ctx: Pick<Registry['ctx'], 'run'>;
};

export function makeCtxMiddleware(sr: PartialRegistry) {
  return (_req: Request, _res: Response, next: () => void) => {
    sr.ctx.run(next);
  };
}
