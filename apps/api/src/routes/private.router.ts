import { router } from '../trpc';
import { tasksRouter } from './tasks.router';

const privateRouter = router({
  tasksRouter,
});

export { privateRouter };
