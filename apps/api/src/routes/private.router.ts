import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { createTaskSchema } from '../app/schemas';
import { tasksRouter } from './tasks.router';

const privateRouter = router({
  tasksRouter,
});

export { privateRouter };
