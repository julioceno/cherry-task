import dayjs from 'dayjs';
import { prismaClient } from '../../Prisma/client';

class GenerateRefreshToken {
  async run(userId: string) {
    await prismaClient.refreshToken.deleteMany({
      where: { userId },
    });

    const expiresIn = dayjs().add(30, 'minute').unix();

    const generateRefreshToken = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken.id;
  }
}

const generateRefreshToken = new GenerateRefreshToken();

export { generateRefreshToken };
