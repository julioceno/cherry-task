import { User } from '@prisma/client';

interface ConstructorProps extends User {}

class UserEntity {
  id: string;
  username: string;
  email: string;

  constructor(user: ConstructorProps) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
  }
}

export { UserEntity };
