import { Category } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type CreateCategoryParams = Omit<
  Category,
  'created_at' | 'updated_at' | 'uuid'
>;

interface ICreateCategory extends CreateCategoryParams {}

export class CreateCategoryUseCase {
  async execute(params: ICreateCategory) {
    try {
      if (
        !params.updated_user_uuid ||
        !params.created_user_uuid ||
        !params.description
      ) {
        throw new Error('Missing data');
      }

      const category = await prisma.category.create({ data: params });

      return category;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
