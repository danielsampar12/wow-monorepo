import { prisma } from '../../../../database/prismaClient';

export class GetTagsUseCase {
  async execute() {
    try {
      return await prisma.tag.findMany({
        where: {
          is_active: true
        },
        include: {
          events: true,
          places: true,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
