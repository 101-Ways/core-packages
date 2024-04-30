import { MongoClient } from 'mongodb';
import { config } from './config';
import { Context, Registry } from '../types';

type MongoModuleConfig = (typeof config)['mongo'];

export async function $onBind(sr: Registry) {
  sr.mongo = new MongoClientModule(sr, config.mongo);
}

export async function $onShutdown(sr: Registry) {
  return sr.mongo.close();
}

export class MongoClientModule extends MongoClient {
  constructor(sr: Registry, config: MongoModuleConfig) {
    super(config.uri, { monitorCommands: true });

    this.on('commandStarted', (ev) => {
      const ctx = sr.ctx.get<Context>();
      if (!ctx) {
        return;
      } else if (!ctx.mongoQueries) {
        ctx.mongoQueries = new Map();
      }

      ctx.mongoQueries.set(ev.requestId, {
        cmd: ev.commandName,
        collection: ev.command[ev.commandName],
        data: {
          deletes: ev.command.deletes,
          filter: ev.command.filter,
        },
        getEvent: sr.ecs.makeEventFn(),
      });
    });

    this.on('commandSucceeded', (ev) => {
      const ctx = sr.ctx.get<Context>();
      if (!ctx) {
        return;
      }

      const meta = ctx.mongoQueries?.get(ev.requestId);
      if (!meta) {
        return;
      }

      sr.log.debug({
        ...sr.ctx.toTraceMeta(ctx),
        data: meta.data,
        event: {
          ...meta.getEvent('mongo-response'),
          action: meta.cmd,
          dataset: meta.collection,
        },
        message: 'mongo response',
      });
    });

    this.on('commandFailed', (ev) => {
      const ctx = sr.ctx.get<Context>();
      if (!ctx) {
        return;
      }

      const meta = ctx.mongoQueries?.get(ev.requestId);
      if (!meta) {
        return;
      }

      sr.log.error({
        ...sr.ctx.toTraceMeta(ctx),
        data: meta.data,
        error: {
          id: ev.failure.name,
          message: ev.failure.message,
        },
        event: {
          ...meta.getEvent('mongo-response'),
          action: meta.cmd,
          dataset: meta.collection,
        },
        message: 'mongo error response',
      });
    });
  }
}
