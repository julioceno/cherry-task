import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { tokenGenerate } from '../functions';
import { AuthenticateInput } from '../schemas';

const prisma = new PrismaClient();

class AuthenticateController {
  constructor() {}

  async authenticate({ username, password }: AuthenticateInput) {
    const user = await prisma.user.findUnique({
      where: { username },
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
      user,
      token,
    };
  }
}

const authenticateController = new AuthenticateController();

export { authenticateController };
