import { prisma } from '../../../../database/prismaClient';

export class GetAuthorsUseCase {
  async execute() {
    try {
      const authors = await prisma.author.findMany({
        where: {
          is_active: true,
        },
        include: {
          articles: {
            include: {
              images: {
                orderBy: {
                  priority: 'asc',
                },
              },
            },
            orderBy: {
              publishment_date: 'desc'
            }
          },
        },
      });

      const authorsWithArticles = authors.filter(
        (author) => author.articles.length > 0,
      );

      return authorsWithArticles;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
