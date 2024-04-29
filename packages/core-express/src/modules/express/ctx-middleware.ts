import type { Request, Response } from 'express';
import { Registry } from '../../types';

export function makeCtxMiddleware(sr: Registry) {
  return (_req: Request, _res: Response, next: () => void) => {
    sr.ctx.als.run(sr.ctx.make(), next);
  };
}
