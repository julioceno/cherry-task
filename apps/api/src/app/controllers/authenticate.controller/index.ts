import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { UserEntity } from '../../entities';
import { tokenGenerate } from '../../functions';
import { TokenPayload } from '../../middlewares';
import { generateRefreshToken } from '../../provider/GenerateRefreshToken';
import { AuthenticateInput } from '../../schemas';
import { RefreshTokenInput } from '../../schemas/refreshToken';
import { Messages } from '../../utils';

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

    const token = tokenGenerate(user.id);
    const refreshToken = await generateRefreshToken.run(user.id);

    const userEntity = new UserEntity(user);

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

  async refreshToken({ refreshToken: refreshTokenId }: RefreshTokenInput) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        id: refreshTokenId,
      },
    });

    if (!refreshToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Refresh token invalid',
      });
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const token = tokenGenerate(refreshToken.userId);

    if (refreshTokenExpired) {
      const newRefreshToken = await generateRefreshToken.run(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

const authenticateController = new AuthenticateController();

export { authenticateController };
