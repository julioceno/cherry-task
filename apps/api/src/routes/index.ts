import { publicProcedure, router } from '../trpc';
import { privateRouter } from './private.router';

import { authenticateController, userController } from '../app/controllers/';
import {
  authenticateSchema,
  createUserSchema,
  refreshTokenSchema,
} from '../app/schemas';

const appRouter = router({
  ping: publicProcedure.query(() => 'pong!'),
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => userController.create(input)),
  authenticate: publicProcedure
    .input(authenticateSchema)
    .mutation(async ({ input }) => authenticateController.authenticate(input)),
  refreshToken: publicProcedure
    .input(refreshTokenSchema)
    .mutation(({ input }) => authenticateController.refreshToken(input)),
  logout: publicProcedure
    .input(refreshTokenSchema)
    .mutation(({ input }) => authenticateController.logout(input)),
  privateRouter,
});

export type AppRouter = typeof appRouter;
export { appRouter };
