import { createController } from './create.controller';
import { findAllController } from './find-all.controller';
import { updateController } from './update.controller';

class TasksController {
  create(userId: string) {
    return createController.run(userId);
  }

  findAll() {
    return findAllController.run();
  }

  update() {
    return updateController.run();
  }
}

const tasksController = new TasksController();
export { tasksController };
