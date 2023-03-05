import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';

const prisma = new PrismaClient();

class CreateController {
  constructor() {}

  async run(userId: string) {
    const createTask = await prisma.task.create({
      data: { userId },
    });

    return new TaskEntity(createTask);
  }
}

const createController = new CreateController();

export { createController };
