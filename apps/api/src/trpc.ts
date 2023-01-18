import { initTRPC } from '@trpc/server';
import { Context } from './server/context';

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;
const middleware = t.middleware;

export { t, router, publicProcedure, middleware };
