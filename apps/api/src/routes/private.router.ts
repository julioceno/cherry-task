import { protectedProcedure } from '../app/middlewares';
import { router } from '../trpc';

const privateRouter = router({
  secretPlace: protectedProcedure.query(({ ctx }) => {
    return 'a key';
  }),
});

export { privateRouter };
