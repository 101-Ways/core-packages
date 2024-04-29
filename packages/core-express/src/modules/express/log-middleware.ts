import type { Request, Response } from 'express';
import type { Registry } from '../../types';

type GetEventFn = ReturnType<Registry['ecs']['makeEventFn']>;

export function makeLogMiddleware(sr: Registry) {
  function logRequest(req: Request) {
    sr.log.debug({
      ...sr.ctx.getTraceMeta(),
      http: { request: { method: req.method } },
      message: 'http request',
      url: { path: req.url },
    });
  }

  function logResponse(req: Request, res: Response, getEvent: GetEventFn) {
    sr.log.info({
      ...sr.ctx.getTraceMeta(),
      event: getEvent('http-response'),
      http: {
        request: { method: req.method },
        response: { status_code: res.statusCode },
      },
      message: 'http response',
      url: { path: req.url, route: req.route?.path },
    });
  }

  return (req: Request, res: Response, next: () => void) => {
    const getEvent = sr.ecs.makeEventFn();

    logRequest(req);

    res.once('finish', () => {
      logResponse(req, res, getEvent);
    });

    next();
  };
}
