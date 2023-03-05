import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CreateTaskController {
  constructor() {}

  async run(userId: string) {
    const createTask = await prisma.task.create({
      data: { userId },
    });

    return createTask;
  }
}

const createTaskController = new CreateTaskController();

export { createTaskController };
