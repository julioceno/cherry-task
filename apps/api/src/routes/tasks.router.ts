import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { createTaskSchema } from '../app/schemas';
import { tasksController } from '../app/controllers';

const tasksRouter = router({
  create: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx: { userId } }) => tasksController.create(userId)),
  findAll: protectedProcedure.query(tasksController.findAll),
});

export { tasksRouter };
