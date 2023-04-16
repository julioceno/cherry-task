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
import { prismaClient } from '../../../Prisma/client';
import { logoutController } from './controllers';

class AuthenticateController {
  async authenticate({ username, password }: AuthenticateInput) {
    const user = await prismaClient.user.findUnique({
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

  async refreshToken({ refreshToken: refreshTokenId }: RefreshTokenInput) {
    const refreshToken = await prismaClient.refreshToken.findUnique({
      where: {
        id: refreshTokenId,
      },
    });

    if (!refreshToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Refresh token invalid.',
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

  logout(body: RefreshTokenInput) {
    return logoutController.run(body);
  }
}

const authenticateController = new AuthenticateController();

export { authenticateController };
