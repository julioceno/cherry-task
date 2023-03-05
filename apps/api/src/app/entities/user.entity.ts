import { User } from '@prisma/client';

interface ConstructorProps extends User {}

class UserEntity {
  id: string;
  username: string;
  email: string;
  password: string;

  createdAt: Date;
  updatedAt?: Nullable<Date>;

  constructor(user: ConstructorProps) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;

    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export { UserEntity };
