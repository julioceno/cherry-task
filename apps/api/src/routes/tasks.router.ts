import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { updateTaskSchema } from '../app/schemas';
import { tasksController } from '../app/controllers';

const tasksRouter = router({
  create: protectedProcedure
    .input(updateTaskSchema)
    .mutation(async ({ ctx: { userId } }) => tasksController.create(userId)),
  findAll: protectedProcedure.query(tasksController.findAll),
  update: protectedProcedure
    .input(updateTaskSchema)
    .mutation(({ input }) => tasksController.update('', input)),
});

export { tasksRouter };
