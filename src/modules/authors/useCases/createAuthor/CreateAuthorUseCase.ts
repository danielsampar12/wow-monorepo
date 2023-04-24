import { Author } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type AuthorPrisma = Omit<Author, 'uuid' | 'created_at' | 'updated_at' | 'url'>;

export interface ICreateAuthorUseCase extends AuthorPrisma {
  user_uuid: string;
}

export class CreateAuthorUseCase {
  async execute({ user_uuid, ...rest }: ICreateAuthorUseCase) {
    try {
      return await prisma.author.create({
        data: {
          ...rest,
          created_user_uuid: user_uuid,
          updated_user_uuid: user_uuid,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
