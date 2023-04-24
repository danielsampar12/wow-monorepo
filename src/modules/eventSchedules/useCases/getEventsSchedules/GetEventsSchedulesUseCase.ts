import { prisma } from '../../../../database/prismaClient';

export class GetEventsSchedulesUseCase {
  async execute() {
    try {
      return await prisma.eventSchedule.findMany({
        include: {
          event: {
            include: {
              place: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
