import { CreateUserInput } from '../../schemas';
import { createUserController, findOneController } from './controllers';

class UserController {
  create(body: CreateUserInput) {
    return createUserController.run(body);
  }

  findOne(id: string) {
    return findOneController.run(id);
  }
}

const userController = new UserController();

export { userController };
