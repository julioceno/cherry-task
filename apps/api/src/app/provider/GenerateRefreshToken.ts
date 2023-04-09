import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

class GenerateRefreshToken {
  async run(userId: string) {
    const expiresIn = dayjs().add(15, 'minute').unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}

const generateRefreshToken = new GenerateRefreshToken();

export { generateRefreshToken };
