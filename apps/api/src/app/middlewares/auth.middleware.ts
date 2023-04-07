import { TRPCError } from '@trpc/server';
import { middleware, publicProcedure } from '../../trpc';
import jwt from 'jsonwebtoken';
import { config } from '../../config';

export interface TokenPayload {
  id: string;
}

const isAuthed = middleware(({ next, ctx }) => {
  const authorization = ctx.authorization;

  if (!authorization) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'No token provider',
    });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token Error',
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token malformatted',
    });
  }

  try {
    const payload = jwt.verify(token, config.secret) as TokenPayload;

    const userId = String(payload.id);
    return next({
      ctx: { userId },
    });
  } catch {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token Error',
    });
  }
});

export const protectedProcedure = publicProcedure.use(isAuthed);
