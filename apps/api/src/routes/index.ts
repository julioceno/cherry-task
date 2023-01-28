import { publicProcedure, router } from '../trpc';
import { authenticateRouter } from './authenticate.router';

import { authenticateController, userController } from '../app/controllers/';
import { authenticateSchema, createUserSchema } from '../app/schemas';

const appRouter = router({
  ping: publicProcedure.query(() => 'pong!'),
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => userController.create(input)),
  authenticate: publicProcedure
    .input(authenticateSchema)
    .mutation(async ({ input }) => authenticateController.authenticate(input)),
  authenticateRouter,
});

export type AppRouter = typeof appRouter;
export { appRouter };
