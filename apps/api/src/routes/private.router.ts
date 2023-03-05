import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { createTaskSchema } from '../app/schemas';
import { createTaskController } from '../app/controllers';

const privateRouter = router({
  createTask: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx: { userId } }) => createTaskController.run(userId)),
});

export { privateRouter };
