import { CreateUserInput } from '../../schemas';
import { createUserController } from './controllers';

class UserController {
  create(body: CreateUserInput) {
    return createUserController.run(body);
  }
}

const userController = new UserController();

export { userController };
