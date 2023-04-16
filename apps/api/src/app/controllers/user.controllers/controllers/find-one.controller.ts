import { TRPCError } from '@trpc/server';
import { prismaClient } from '../../../../Prisma/client';
import { Messages } from '../../../utils';

class FindOneController {
  async run(id: string) {
    const user = await this.#getUser(id);

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: Messages.MESSAGE_NOT_FOUND,
      });
    }

    return user;
  }

  #getUser(id: string) {
    return prismaClient.user.findUnique({
      where: {
        id,
      },
    });
  }
}

const findOneController = new FindOneController();
export { findOneController };
