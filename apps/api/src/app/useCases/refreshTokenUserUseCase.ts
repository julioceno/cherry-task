import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { tokenGenerate } from '../functions';
import dayjs from 'dayjs';
import { generateRefreshToken } from '../provider/GenerateRefreshToken';

const prisma = new PrismaClient();
// TODO: remover depois se possivel
class RefreshTokenUserUseCase {
  async run(refreshTokenId: string) {
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
      await prisma.refreshToken.deleteMany({
        where: { userId: refreshToken.userId },
      });

      const newRefreshToken = await generateRefreshToken.run(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

const refreshTokenUserUseCase = new RefreshTokenUserUseCase();
export { refreshTokenUserUseCase };
