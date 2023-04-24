import { Event } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type PrismaEvent = Omit<Event, 'created_at' | 'updated_at' | 'uuid'>;

interface ICreateEvent extends PrismaEvent {
  event_tags_uuids?: string[];
}

export class CreateEventUseCase {
  async execute({ event_tags_uuids = [], ...params }: ICreateEvent) {
    try {
      return await prisma.event.create({
        data: {
          ...params,
          event_tags: {
            connect: event_tags_uuids.map((uuid) => ({ uuid })),
          },
        },
        include: {
          place: true,
          owner: true,
          event_tags: true,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
