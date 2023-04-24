import { EventUserRating } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

import { CustomError } from '../../../../utils/CustomError';

type ICreateEventUserRatingsUseCase = Omit<
  EventUserRating,
  'uuid' | 'is_active' | 'created_at' | 'updated_at'
>;

type QueryRawResponse = {
  avg: string;
}[];

export class CreateEventUserRatingsUseCase {
  async execute(data: ICreateEventUserRatingsUseCase) {
    try {
      const { event_uuid, user_uuid } = data;

      await prisma.$executeRaw`
        update 
          event_users_ratings eur 
        set 
          is_active = false 
        where 
          eur.uuid = (
            select 
              uuid 
            from 
              event_users_ratings eur 
            where 
              eur.event_uuid = ${event_uuid}
              and eur.user_uuid = ${user_uuid}
              and eur.is_active = true
          )
      `;

      await prisma.eventUserRating.create({
        data: {
          ...data,
          is_active: true,
          created_user_uuid: user_uuid,
          updated_user_uuid: user_uuid,
        },
      });

      const result: QueryRawResponse = await prisma.$queryRaw`
        select 
          avg(rating) 
        from 
          event_users_ratings eur 
        where 
          eur.event_uuid = ${event_uuid}
          and eur.is_active = true
      `;

      const avgRate = +result[0].avg;

      return await prisma.event.update({
        where: { uuid: event_uuid },
        data: {
          rate: avgRate.toFixed(1),
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
