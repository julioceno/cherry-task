import { createController } from './create.controller';
import { findAllController } from './find-all.controller';

class TasksController {
  create(userId: string) {
    return createController.run(userId);
  }

  findAll() {
    return findAllController.run();
  }
}

const tasksController = new TasksController();
export { tasksController };
