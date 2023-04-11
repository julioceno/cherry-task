import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { TaskEntity } from '../../../entities';
import { Messages } from '../../../utils/messages/messages';
import { prismaClient } from '../../../../Prisma/client';

export class FindOneController {
  async run(id: string, userId: string) {
    const task = await prismaClient.task.findFirst({
      where: { id, userId },
      include: { steps: true },
    });

    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: Messages.MESSAGE_TASK_NOTFOUND,
      });
    }

    return new TaskEntity(task);
  }
}

const findOneController = new FindOneController();

export { findOneController };
