import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { prismaClient } from '../../../../Prisma/client';

class CreateController {
  constructor() {}

  async run(userId: string) {
    const createTask = await prismaClient.task.create({
      data: { userId },
      include: { steps: true },
    });

    return new TaskEntity(createTask);
  }
}

const createController = new CreateController();

export { createController };
