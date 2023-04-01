import { Step } from '@prisma/client';

interface ConstructorProps extends Step {}

class StepEntity {
  id: string;
  title: Nullable<string>;
  checked: boolean;

  constructor(task: ConstructorProps) {
    this.id = task.id;
    this.title = task.title;
    this.checked = task.checked;
  }
}

export { StepEntity };
