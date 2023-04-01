import { Prisma, PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { UpdateTaskInput } from '../../../schemas';

const prisma = new PrismaClient();

class UpdateController {
  async run(body: UpdateTaskInput) {
    // TODO: validar se o usuário que esta tentando alterar é o mesmo usuário que criou a tarefa

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
}

const updateController = new UpdateController();
export { updateController };
