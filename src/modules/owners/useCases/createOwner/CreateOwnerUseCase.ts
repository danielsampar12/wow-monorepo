import { Owner } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type CreateOwner = Omit<Owner, 'created_at' | 'updated_at' | 'uuid'>;

export class CreateOwnerUseCase {
  async execute(data: CreateOwner) {
    try {
      return await prisma.owner.create({
        data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
