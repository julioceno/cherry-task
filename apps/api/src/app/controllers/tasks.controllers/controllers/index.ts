import { UpdateTaskInput } from '../../../schemas';
import { createController } from './create.controller';
import { deleteController } from './delete.controller';
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

  findOne(userId: string, taskId: string) {
    return findOneController.run(userId, taskId);
  }

  update(userId: string, body: UpdateTaskInput) {
    return updateController.run(userId, body);
  }

  delete(userId: string, taskId: string) {
    return deleteController.run(userId, taskId);
  }
}

const tasksController = new TasksController();
export { tasksController };
