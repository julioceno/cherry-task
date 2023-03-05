import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';

const prisma = new PrismaClient();

class FindAllController {
  async run() {
    const tasks = await prisma.task.findMany();

    const entities = tasks.map((task) => new TaskEntity(task));
    return entities;
  }
}

const findAllController = new FindAllController();

export { findAllController };
