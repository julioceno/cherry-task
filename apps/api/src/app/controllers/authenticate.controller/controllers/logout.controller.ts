import { TRPCError } from '@trpc/server';
import { prismaClient } from '../../../../Prisma/client';
import { RefreshTokenInput } from '../../../schemas';

class LogoutController {
  async run({ refreshToken: refreshTokenId }: RefreshTokenInput) {
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

    return prismaClient.refreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }
}

const logoutController = new LogoutController();

export { logoutController };
