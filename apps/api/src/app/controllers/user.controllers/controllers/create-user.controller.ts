import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { UserEntity } from '../../../entities';
import { tokenGenerate } from '../../../functions';
import { CreateUserInput } from '../../../schemas';
import { generateRefreshToken } from '../../../provider/GenerateRefreshToken';

const prisma = new PrismaClient();

class CreateUserController {
  async run(body: CreateUserInput) {
    const { username, email, password, passwordConfirm } = body;

    await this.#verifyUserAlreadyExists(username, email);
    this.#verifyPassword(password, passwordConfirm);

    const createdUser = await this.#createUser(body);

    const token = tokenGenerate(createdUser.id);
    const refreshToken = (await generateRefreshToken.run(createdUser.id)).id;

    const userEntity = new UserEntity(createdUser);

    return {
      user: userEntity,
      token,
      refreshToken,
    };
  }

  async #verifyUserAlreadyExists(username: string, email: string) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { username },
    });

    if (userAlreadyExists) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Usuário ja existe',
      });
    }

    const emailAlreadyUsed = await prisma.user.findUnique({
      where: { email },
    });

    if (emailAlreadyUsed) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Email já está sendo utilizado',
      });
    }
  }

  #verifyPassword(password: string, passwordConfirm: string) {
    if (password !== passwordConfirm) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'As senhas não são iguais',
      });
    }
  }

  #createUser({ username, email, password }: CreateUserInput) {
    const passwordEncrypted = bcrypt.hashSync(password, 8);

    return prisma.user.create({
      data: {
        username,
        email,
        password: passwordEncrypted,
      },
    });
  }
}

const createUserController = new CreateUserController();

export { createUserController };
