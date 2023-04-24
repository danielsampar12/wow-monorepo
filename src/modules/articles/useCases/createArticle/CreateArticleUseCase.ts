import { Article } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

export type PrismaArticle = Omit<Article, 'uuid' | 'created_at' | 'updated_at'>;

export class CreateArticleUseCase {
  async execute(data: PrismaArticle) {
    try {
      return await prisma.article.create({
        data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
