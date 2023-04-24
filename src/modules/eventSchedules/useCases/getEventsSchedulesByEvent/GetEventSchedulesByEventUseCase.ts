import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IGetEventSchedulesByEventUseCase {
  eventUuid: string;
  date: string;
}

export class GetEventSchedulesByEventUseCase {
  async execute({ date, eventUuid }: IGetEventSchedulesByEventUseCase) {
    try {
      return await prisma.eventSchedule.findMany({
        where: {
          AND: [
            {
              date: {
                gt: new Date(date),
              },
            },
            {
              event_uuid: eventUuid,
            },
          ],
        },
        orderBy: {
          date: 'asc',
        },
        take: 10,
      });
    } catch (error: any) {
      throw new CustomError(error.messsage, error.status);
    }
  }
}
