import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';

const prisma = new PrismaClient();

class CreateTaskController {
  constructor() {}

  async run(userId: string) {
    const createTask = await prisma.task.create({
      data: { userId },
    });

    return new TaskEntity(createTask);
  }
}

const createTaskController = new CreateTaskController();

export { createTaskController };
