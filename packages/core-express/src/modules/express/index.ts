import { createServer, type Server } from 'http';
import { Registry } from '../../types';
import { makeExpressApp } from './app';
import { Request, Response } from 'express';
import { makeError } from './make-error';

export function $onBind(sr: Registry) {
  sr.express = new ExpressModule(sr);
}

export function $onLoad(sr: Registry) {
  return new Promise<void>((resolve) => {
    const { port } = sr.config.express;

    sr.express.server.listen(port, () => {
      sr.log.info({ message: 'server listening', server: { port } });
      resolve();
    });
  });
}

export function $onShutdown(sr: Registry) {
  return new Promise<void>((resolve) => {
    sr.express.server.close((err) => {
      if (err) {
        sr.log.warn({ err, message: 'error closing express server' });
      }

      resolve();
    });
  });
}

export class ExpressModule {
  app: ReturnType<typeof makeExpressApp>;
  server: Server;

  constructor(private sr: Registry) {
    const app = makeExpressApp(sr);

    this.app = app;
    this.server = createServer(app);
  }

  returnError(req: Request, res: Response, err: unknown, code?: number) {
    const { message, cause, stack, statusCode } = makeError(err, code);

    this.sr.log.warn({
      error: { message, cause, stack },
      http: {
        request: { method: req.method },
        response: { status_code: statusCode },
      },
      message: 'http error',
      url: { path: req.url },
    });

    res.status(statusCode).json({ error: { message, cause } });
  }
}
