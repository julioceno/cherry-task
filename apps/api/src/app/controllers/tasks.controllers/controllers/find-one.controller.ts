import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { TaskEntity } from '../../../entities';
import { Messages } from '../../../utils/messages/messages';

const prisma = new PrismaClient();

export class FindOneController {
  async run(id: string, userId: string) {
    const task = await prisma.task.findFirst({
      where: { id, userId },
      include: { steps: true },
    });

    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: Messages.MESSAGE_TASK_NOTFOUND,
      });
    }

    console.log('ryu', task);

    return new TaskEntity(task);
  }
}

const findOneController = new FindOneController();

export { findOneController };
