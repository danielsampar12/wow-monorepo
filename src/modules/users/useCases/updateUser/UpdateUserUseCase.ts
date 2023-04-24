import { User } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IUpdateUserUseCase {
  uuid: string;
  data: User;
}

export class UpdateUserUseCase {
  async execute({ data, uuid }: IUpdateUserUseCase) {
    try {
      if (data.uuid) {
        throw new CustomError('User uuid must not be changed', 400);
      }

      if (data.email) {
        throw new CustomError('User email must not be changed', 400);
      }

      if (data.password) {
        throw new CustomError('User password must not be changed', 400);
      }

      return await prisma.user.update({
        where: { uuid },
        data,
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  }
}
