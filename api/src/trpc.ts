import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;
const middleware = t.middleware;

export { t, router, publicProcedure, middleware };
