import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IDeleteUserUseCase {
  uuid: string;
}

export class DeleteUserUseCase {
  async execute({ uuid }: IDeleteUserUseCase) {
    try {
      const user = await prisma.user.findUnique({
        where: { uuid }
      });

      if (!user || !user.is_active) {
        throw new CustomError('User not found.', 400);
      }

      const inactiveUser: User = {
        ...user,
        is_active: false,
        email: await hash(user.email, 10),
        name: await hash(user.name, 10),
        phone: await hash(user.phone ?? 'phone', 10),
        address: await hash(user.address ?? 'address', 10),
        address_complement: await hash(user.address_complement ?? 'address_complement', 10),
        address_number: await hash(user.address_number ?? 'address_number', 10)
      };

      await prisma.user.update({
        where: { uuid },
        data: inactiveUser
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  }
}
