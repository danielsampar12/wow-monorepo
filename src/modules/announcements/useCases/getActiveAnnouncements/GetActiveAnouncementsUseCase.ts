import { prisma } from '../../../../database/prismaClient';

export class GetActiveAnouncementsUseCase {
  async execute() {
    try {
      const announcements = await prisma.announcement.findMany({
        where: {
          AND: [
            {
              is_active: true,
            },
            {
              OR: [
                {
                  end_date: {
                    gte: new Date(),
                  },
                },
                {
                  end_date: null,
                },
              ],
            },
          ],
        },
        orderBy: {
          priority: 'asc',
        },
      });

      return announcements;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
