import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { updateTaskSchema, createUserSchema } from '../app/schemas';
import { tasksController } from '../app/controllers';
import { z } from 'zod';

const tasksRouter = router({
  create: protectedProcedure
    .input(z.object({})) // FIXME Ver essa porra
    .mutation(({ ctx: { userId } }) => tasksController.create(userId)),
  findAll: protectedProcedure.query(({ ctx: { userId } }) =>
    tasksController.findAll(userId)
  ),
  update: protectedProcedure
    .input(updateTaskSchema)
    .mutation(({ input }) => tasksController.update(input)),
});

export { tasksRouter };
