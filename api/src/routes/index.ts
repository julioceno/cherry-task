import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { tokenGenerate } from '../app/functions';
import { publicProcedure, router } from '../trpc';

const prisma = new PrismaClient();

const appRouter = router({
  greeting: publicProcedure.query(() => 'hello tRPC v10!'),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        passwordConfirm: z.string(),
      })
    )
    .mutation(async (req) => {
      const { name, email, password, passwordConfirm } = req.input;

      const userAlreadyExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userAlreadyExists) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Usuário ja existe',
        });
      }

      if (password !== passwordConfirm) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'As senhas não são iguais',
        });
      }

      const passwordEncrypted = bcrypt.hashSync(password, 8);

      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordEncrypted,
        },
      });

      const token = tokenGenerate(createdUser);

      return {
        data: { createdUser, token },
      };
    }),
  authenticate: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (req) => {
      const { email, password } = req.input;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não existe',
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Senha incorreta',
        });
      }

      const token = tokenGenerate(user);

      return {
        data: { user, token },
      };
    }),
  isAuthenticate: publicProcedure.query(() => {
    return true;
  }),
});

export type AppRouter = typeof appRouter;
export { appRouter };
