import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { UserEntity } from '../entities';
import { tokenGenerate } from '../functions';
import { AuthenticateInput } from '../schemas';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../middlewares';
import { Messages } from '../utils';

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
        message: Messages.MESSAGE_USER_NOT_EXISTS,
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
    const userEntity = new UserEntity(user);

    return {
      user: userEntity,
      token,
    };
  }

  async verifyToken() {
    const token = '';
    const secret = config.secret;

    if (!secret) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Chave secret é vazia',
      });
    }

    try {
      const payload = jwt.verify(token, secret) as TokenPayload;

      if (payload) {
        const user = await prisma.user.findUnique({
          where: { id: payload.id },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: Messages.MESSAGE_USER_NOT_EXISTS,
          });
        }

        const userEntity = new UserEntity(user);

        return { valid: true, user: userEntity };
      }

      return { valid: false, user: null };
    } catch {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Houve algum problema ao tentar validar seu token',
      });
    }
  }
}

const authenticateController = new AuthenticateController();

export { authenticateController };
