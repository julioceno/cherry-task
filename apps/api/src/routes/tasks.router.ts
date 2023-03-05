import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { createTaskSchema } from '../app/schemas';
import { tasksController } from '../app/controllers';

const tasksRouter = router({
  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx: { userId } }) => tasksController.create(userId)),
});

export { tasksRouter };
