import { publicProcedure, router } from '../trpc';

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
  hello: publicProcedure.query((req) => {
    return 'hello 2';
  }),
});

export type AppRouter = typeof appRouter;
export { appRouter };
