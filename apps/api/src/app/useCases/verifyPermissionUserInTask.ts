import { TRPCError } from '@trpc/server';
import { prismaClient } from '../../Prisma/client';
import { Messages } from '../utils';

class VerifyPermissionUserInTask {
  async run(userId: string, taskId: string) {
    const task = await prismaClient.task.findUnique({
      where: { id: taskId },
      select: { userId: true },
    });

    /*     if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: Messages.MESSAGE_NOT_FOUND,
      });
    }

    if (task.userId !== userId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: Messages.MESSAGE_USER_NOT_PERMISSION,
      });
    } */
  }
}

const verifyPermissionUserInTask = new VerifyPermissionUserInTask();
export { verifyPermissionUserInTask };
