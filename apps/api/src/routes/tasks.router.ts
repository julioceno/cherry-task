import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { updateTaskSchema, createUserSchema } from '../app/schemas';
import { tasksController } from '../app/controllers';
import { z } from 'zod';

const tasksRouter = router({
  create: protectedProcedure
    .input(z.object({}))
    .mutation(({ ctx: { userId } }) => tasksController.create(userId)),
  findAll: protectedProcedure.query(({ ctx: { userId } }) =>
    tasksController.findAll(userId)
  ),
  findOne: protectedProcedure
    .input(z.string())
    .query(({ input, ctx: { userId } }) =>
      tasksController.findOne(userId, input)
    ),
  update: protectedProcedure
    .input(updateTaskSchema)
    .mutation(({ input, ctx: { userId } }) =>
      tasksController.update(userId, input)
    ),
  delete: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx: { userId } }) =>
      tasksController.delete(userId, input)
    ),
});

export { tasksRouter };
