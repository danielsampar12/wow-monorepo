import { PlaceUserRating } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

import { CustomError } from '../../../../utils/CustomError';

type ICreatePlaceUserRatingsUseCase = Omit<
  PlaceUserRating,
  'uuid' | 'is_active' | 'created_at' | 'updated_at'
>;

type QueryRawResponse = {
  avg: string;
}[];

export class CreatePlaceUserRatingsUseCase {
  async execute(data: ICreatePlaceUserRatingsUseCase) {
    try {
      const { place_uuid, user_uuid } = data;

      await prisma.$executeRaw`
        update 
          place_users_ratings pur 
        set 
          is_active = false 
        where 
          pur.uuid = (
            select 
              uuid 
            from 
              place_users_ratings pur 
            where 
              pur.place_uuid = ${place_uuid}
              and pur.user_uuid = ${user_uuid}
              and pur.is_active = true
          )
      `;

      await prisma.placeUserRating.create({
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
          place_users_ratings pur 
        where 
          pur.place_uuid = ${place_uuid}
          and pur.is_active = true
      `;

      const avgRate = +result[0].avg;

      return await prisma.place.update({
        where: { uuid: place_uuid },
        data: {
          rate: avgRate.toFixed(1),
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
