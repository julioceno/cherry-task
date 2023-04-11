import { prismaClient } from '../../../../Prisma/client';
import { TaskEntity } from '../../../entities';

class FindAllController {
  async run(userId: string) {
    const tasks = await prismaClient.task.findMany({
      where: {
        userId,
      },
      include: {
        steps: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const entities = tasks.map((task) => new TaskEntity(task));
    return entities;
  }
}

const findAllController = new FindAllController();
export { findAllController };
