import { prismaClient } from '../../../../Prisma/client';
import { verifyPermissionUserInTask } from '../../../useCases/verifyPermissionUserInTask';

class DeleteController {
  async run(userId: string, taskid: string) {
    await verifyPermissionUserInTask.run(userId, taskid);

    return prismaClient.task.delete({
      where: { id: taskid },
    });
  }
}

const deleteController = new DeleteController();
export { deleteController };
