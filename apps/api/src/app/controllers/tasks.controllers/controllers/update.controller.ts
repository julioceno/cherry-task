import { Prisma, PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { UpdateTaskInput } from '../../../schemas';

const prisma = new PrismaClient();

class UpdateController {
  async run(body: UpdateTaskInput) {
    const updatedTask = await prisma.$transaction(async (prisma) => {
      body.steps.map((step) =>
        prisma.step.upsert({
          where: { id: step.id },
          update: {
            title: step.label,
            checked: step.checked,
          },
          create: {
            title: step.label,
            checked: step.checked,
            taskId: body.id,
          },
        })
      );

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
}

const updateController = new UpdateController();
export { updateController };
