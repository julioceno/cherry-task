import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';

const prisma = new PrismaClient();

class FindAllController {
  async run(userId: string) {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        steps: true,
      },
    });

    const entities = tasks.map((task) => new TaskEntity(task));
    return entities;
  }
}

const findAllController = new FindAllController();
export { findAllController };
