import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  async function getTokenFromHeader() {
    const authorization = req.headers.authorization;
    return authorization || null;
  }

  const authorization = await getTokenFromHeader();
  return { authorization };
}

export type Context = inferAsyncReturnType<typeof createContext>;
