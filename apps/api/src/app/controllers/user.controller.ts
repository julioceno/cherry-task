import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { tokenGenerate } from '../functions';
import { CreateUserInput } from '../schemas/users';

const prisma = new PrismaClient();

class UserController {
  constructor() {}

  async create(body: CreateUserInput) {
    const { username, email, password, passwordConfirm } = body;

    const userAlreadyExists = await prisma.user.findUnique({
      where: { username },
    });

    if (userAlreadyExists) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Usuário ja existe',
      });
    }

    if (password !== passwordConfirm) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'As senhas não são iguais',
      });
    }

    const passwordEncrypted = bcrypt.hashSync(password, 8);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordEncrypted,
      },
    });

    const token = tokenGenerate(createdUser);

    return {
      createdUser,
      token,
    };
  }
}

const userController = new UserController();

export { userController };
