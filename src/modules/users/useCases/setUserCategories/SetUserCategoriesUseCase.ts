import { prisma } from '../../../../database/prismaClient';

interface ISetUserCategoriesUseCase {
  user_uuid: string;
  categories_uuids: string[];
}

export class SetUserCategoriesUseCase {
  async execute({ categories_uuids, user_uuid }: ISetUserCategoriesUseCase) {
    try {
      return await prisma.user.update({
        where: {
          uuid: user_uuid,
        },
        data: {
          categories: {
            set: categories_uuids.map((uuid) => ({
              uuid,
            })),
          },
        },
        include: {
          categories: true,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
