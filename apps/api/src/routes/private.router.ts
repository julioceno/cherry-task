import { userController } from '../app/controllers';
import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';
import { tasksRouter } from './tasks.router';

const privateRouter = router({
  tasksRouter,
  getUser: protectedProcedure.query(({ ctx: { userId } }) => {
    return userController.findOne(userId);
  }),
});

export { privateRouter };
