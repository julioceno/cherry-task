import { UpdateTaskInput } from '../../../schemas';
import { createController } from './create.controller';
import { findAllController } from './find-all.controller';
import { findOneController, FindOneController } from './find-one.controller';
import { updateController } from './update.controller';

class TasksController {
  create(userId: string) {
    return createController.run(userId);
  }

  findAll(userId: string) {
    return findAllController.run(userId);
  }

  findOne(taskId: string, userId: string) {
    return findOneController.run(taskId, userId);
  }

  update(body: UpdateTaskInput) {
    return updateController.run(body);
  }
}

const tasksController = new TasksController();
export { tasksController };
