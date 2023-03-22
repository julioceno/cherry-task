import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { UpdateTaskInput } from '../../../schemas';

const prisma = new PrismaClient();

class UpdateController {
  constructor() {}

  async run() {
    const updatedTask = await prisma.task.update({
      where: { id: '' },
      data: this.buildData({}),
    });

    return new TaskEntity(updatedTask);
  }

  buildData(data: UpdateTaskInput) {
    return {
      description: data.description ?? undefined,
      name: data.name ?? undefined,
    };
  }
}

const updateController = new UpdateController();
export { updateController };
