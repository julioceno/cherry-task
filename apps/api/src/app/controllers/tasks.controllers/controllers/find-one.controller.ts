import { prismaClient } from '../../../../Prisma/client';
import { TaskEntity } from '../../../entities';
import { verifyPermissionUserInTask } from '../../../useCases/verifyPermissionUserInTask';

export class FindOneController {
  async run(userId: string, id: string) {
    await verifyPermissionUserInTask.run(userId, id);

    const task = await prismaClient.task.findFirst({
      where: { id, userId },
      include: { steps: true },
    });

    return new TaskEntity(task!);
  }
}

const findOneController = new FindOneController();

export { findOneController };
