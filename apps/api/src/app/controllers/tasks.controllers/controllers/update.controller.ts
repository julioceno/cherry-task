import { Prisma, PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { UpdateTaskInput } from '../../../schemas';
import { Messages } from '../../../utils';
import { TRPCError } from '@trpc/server';

const prisma = new PrismaClient();

class UpdateController {
  async run(userId: string, body: UpdateTaskInput) {
    await this.#verifycations(userId, body.id);

    const updatedTask = await prisma.$transaction(async (prisma) => {
      /*   for (let step of body.steps) {
        await prisma.step.upsert({
          where: { id: step?.id ?? undefined },
          update: {
            title: step.label,
            checked: step.checked,
            taskId: body.id,
          },
          create: {
            title: step.label,
            checked: step.checked,
            taskId: body.id,
          },
        });
      } */

      return prisma.task.update({
        where: { id: body.id },
        data: {
          name: body.name,
          description: body.description,
        },
        include: { steps: true },
      });
    });

    return new TaskEntity(updatedTask);
  }

  async #verifycations(id: string, taskId: string) {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: Messages.MESSAGE_TASK_NOTFOUND,
      });
    }

    if (id !== task.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: Messages.MESSAGE_USER_NOT_PERMISSION,
      });
    }
  }
}

const updateController = new UpdateController();
export { updateController };
