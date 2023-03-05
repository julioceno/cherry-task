import { Task } from '@prisma/client';

interface ConstructorProps extends Task {}

class TaskEntity {
  id: string;
  name: Nullable<string>;
  description: Nullable<string>;

  createdAt: Date;
  updatedAt?: Nullable<Date>;

  constructor(task: ConstructorProps) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;

    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export { TaskEntity };
