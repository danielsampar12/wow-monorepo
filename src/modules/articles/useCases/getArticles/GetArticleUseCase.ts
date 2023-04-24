import { prisma } from '../../../../database/prismaClient';

interface IGetArticleUseCase {
  uuid: string;
}

export class GetArticleUseCase {
  async execute({ uuid }: IGetArticleUseCase) {
    try {
      return await prisma.article.findUnique({
        where: {
          uuid,
        },
        include: {
          author: true,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
