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
import { generateRefreshToken } from '../provider/GenerateRefreshToken';
import { refreshTokenUserUseCase } from '../useCases/refreshTokenUserUseCase';
import { RefreshTokenInput } from '../schemas/refreshToken';

const prisma = new PrismaClient();

// TODO: colcoar isso numa pasta paramanter o padrao

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

    await prisma.refreshToken.deleteMany({
      where: { userId: user.id },
    });

    const token = tokenGenerate(user.id);
    const refreshToken = (await generateRefreshToken.run(user.id)).id;

    const userEntity = new UserEntity(user);

    console.log({
      token,
      refreshToken,
    });
    return {
      user: userEntity,
      token,
      refreshToken,
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

  async refreshToken({ refreshToken }: RefreshTokenInput) {
    const value = await refreshTokenUserUseCase.run(refreshToken);

    return value;
  }
}

const authenticateController = new AuthenticateController();

export { authenticateController };
