import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';

const authenticateRouter = router({
  secretPlace: protectedProcedure.query(({ ctx }) => {
    return 'a key';
  }),
});

export { authenticateRouter };
