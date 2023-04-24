import { EventSchedule } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type IEventSchedule = Omit<EventSchedule, 'uuid' | 'created_at' | 'updated_at'>;

export class CreateEventsSchedulesUseCase {
  async execute(data: IEventSchedule[]) {
    try {
      return await prisma.eventSchedule.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
