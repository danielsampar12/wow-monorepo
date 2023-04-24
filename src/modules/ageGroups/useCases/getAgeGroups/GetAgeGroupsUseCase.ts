import { prisma } from '../../../../database/prismaClient';

export class GetAgeGroupsUseCase {
  async execute() {
    try {
      return await prisma.ageGroup.findMany({
        where: {
          is_active: true,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
