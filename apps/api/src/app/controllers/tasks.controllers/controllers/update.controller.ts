import { Prisma, PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { UpdateTaskInput } from '../../../schemas';
import { Messages } from '../../../utils';
import { TRPCError } from '@trpc/server';
import { prismaClient } from '../../../../Prisma/client';

class UpdateController {
  async run(userId: string, body: UpdateTaskInput) {
    await this.#verifycations(userId, body.id);

    const updatedTask = await prismaClient.task.update({
      where: { id: body.id },
      data: this.#buildData(body),
      include: { steps: true },
    });

    return new TaskEntity(updatedTask);
  }

  async #verifycations(id: string, taskId: string) {
    const task = await prismaClient.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: Messages.MESSAGE_NOT_FOUND,
      });
    }

    if (id !== task.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: Messages.MESSAGE_USER_NOT_PERMISSION,
      });
    }
  }

  #buildData(body: UpdateTaskInput): Prisma.TaskUpdateInput {
    return {
      name: body.name,
      description: body.description,
      steps: {
        deleteMany: {
          taskId: body.id,
        },
        createMany: {
          data: body.steps.map((step) => ({
            checked: step.checked,
            title: step.label,
          })),
        },
      },
    };
  }
}

const updateController = new UpdateController();
export { updateController };
