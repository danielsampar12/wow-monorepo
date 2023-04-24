import { Category } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

interface IDeleteCategory {
  categoryUuid: string;
}

export class DeleteCategoryUseCase {
  async execute({ categoryUuid }: IDeleteCategory) {
    if (!categoryUuid) return {} as Category;

    try {
      await prisma.category.deleteMany({
        where: {
          parent_uuid: categoryUuid,
        },
      });

      const category = await prisma.category.delete({
        where: { uuid: categoryUuid },
      });

      return category;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
