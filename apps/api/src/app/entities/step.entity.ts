import { Step } from '@prisma/client';

interface ConstructorProps extends Step {}

class StepEntity {
  title: Nullable<string>;
  checked: boolean;

  constructor(task: ConstructorProps) {
    this.title = task.title;
    this.checked = task.checked;
  }
}

export { StepEntity };
