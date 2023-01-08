import { middleware } from '../../trpc';

interface TokenPayload {
  id: string;
}

const authMiddleware = middleware(({ next }) => {
  next();
});
