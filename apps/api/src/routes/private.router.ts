import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';

const privateRouter = router({
  createTask: protectedProcedure.query(({ ctx }) => {
    console.log('oi bateu', ctx);
    return 'aaa';
  }),
});

export { privateRouter };
