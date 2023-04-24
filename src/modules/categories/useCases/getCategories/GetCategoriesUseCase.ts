import { prisma } from '../../../../database/prismaClient';

interface IGetCategoriesUseCase {
  user_uuid: string;
}

export class GetCategoriesUseCase {
  async execute({ user_uuid }: IGetCategoriesUseCase) {
    try {
      const userCategories = await prisma.user.findUnique({
        where: { uuid: user_uuid },
        select: {
          categories: {
            include: {
              children: true,
            },
          },
        },
      });

      const categories = await prisma.category.findMany({
        include: {
          children: true,
        },
        where: {
          AND: [
            {
              parent_uuid: null,
            },
            {
              users: {
                none: {
                  uuid: user_uuid,
                },
              },
            },
          ],
        },
      });

      if (userCategories?.categories.length) {
        return [...userCategories.categories, ...categories];
      }

      return categories;
    } catch (error: any) {
      console.log({ GetCategoriesUseCaseError: `[${error}]` });

      throw new Error(error);
    }
  }
}
