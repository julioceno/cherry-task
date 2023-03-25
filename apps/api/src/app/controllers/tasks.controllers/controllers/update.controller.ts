import { Prisma, PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../../entities';
import { UpdateTaskInput } from '../../../schemas';

const prisma = new PrismaClient();

class UpdateController {
  async run(id: string, body: UpdateTaskInput) {
    const { steps } = body;

    const updatedTask = await prisma.$transaction(async (prisma) => {
      steps.map((step) =>
        prisma.step.upsert({
          where: { id: step.id },
          update: {
            title: step.label,
            checked: step.checked,
          },
          create: {
            title: '',
            checked: false,
            taskId: id,
          },
        })
      );

      const task = await prisma.task.update({
        where: { id },
        data: {
          name: body.name,
          description: body.description,
        },
        include: { steps: true },
      });

      return task;
    });

    return new TaskEntity(updatedTask);
  }

  // Prisma.StepWhereInput
  /*  buildDataTask(data: UpdateTaskInput) {
    const task: Prisma.TaskUpdateInput = {
      name: data.name,
      description: data.description,
    }

    const steps = data.steps.map(step => ({

    }))

    return {
      name: data.name,
      description: data.description,
    };
  } */
}

const updateController = new UpdateController();
export { updateController };
