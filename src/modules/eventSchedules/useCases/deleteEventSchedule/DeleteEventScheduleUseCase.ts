import { prisma } from '../../../../database/prismaClient';

interface IDeleteEventScheduleUseCase {
  uuid: string;
}

export class DeleteEventScheduleUseCase {
  async execute({ uuid }: IDeleteEventScheduleUseCase) {
    try {
      return await prisma.eventSchedule.delete({
        where: {
          uuid,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
