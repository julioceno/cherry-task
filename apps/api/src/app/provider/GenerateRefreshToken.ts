import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

class GenerateRefreshToken {
  async run(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    const expiresIn = dayjs().add(30, 'minute').unix();

    const generateRefreshToken = await prisma.refreshToken.create({
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
