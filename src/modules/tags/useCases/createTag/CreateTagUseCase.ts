import { Tag } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type CreateTag = Omit<Tag, 'created_at' | 'updated_at' | 'uuid'>;

export class CreateTagUseCase {
  async execute(data: CreateTag) {
    try {
      return await prisma.tag.create({
        data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
