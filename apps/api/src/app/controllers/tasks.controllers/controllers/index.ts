import { createTaskController } from './create-task.controller';

class TasksController {
  create(userId: string) {
    return createTaskController.run(userId);
  }
}

const tasksController = new TasksController();
export { tasksController };
