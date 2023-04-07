import { publicProcedure, router } from '../trpc';
import { privateRouter } from './private.router';

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
  verifyToken: publicProcedure.mutation(async () =>
    authenticateController.verifyToken()
  ),
  privateRouter,
});

export type AppRouter = typeof appRouter;
export { appRouter };
