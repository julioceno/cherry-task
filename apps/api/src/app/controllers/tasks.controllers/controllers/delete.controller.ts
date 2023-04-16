import { prismaClient } from '../../../../Prisma/client';
import { verifyPermissionUserInTask } from '../../../useCases/verifyPermissionUserInTask';

class DeleteController {
  async run(userId: string, taskid: string) {
    verifyPermissionUserInTask.run(userId, taskid);

    const task = await prismaClient.task.delete({
      where: { id: taskid },
    });

    return task;
  }
}

const deleteController = new DeleteController();
export { deleteController };
