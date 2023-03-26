import { Task, Step } from '@prisma/client';
import { StepEntity } from './step.entity';

interface ConstructorProps extends Task {
  steps: Step[];
}

class TaskEntity {
  id: string;
  name: Nullable<string>;
  description: Nullable<string>;

  steps: StepEntity[];

  createdAt: Date;
  updatedAt?: Nullable<Date>;

  constructor({ steps, ...task }: ConstructorProps) {
    this.id = task.id;
    this.name = task.name;
    this.description = task.description;

    this.steps = steps?.map((step) => new StepEntity(step));

    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
  }
}

export { TaskEntity };
