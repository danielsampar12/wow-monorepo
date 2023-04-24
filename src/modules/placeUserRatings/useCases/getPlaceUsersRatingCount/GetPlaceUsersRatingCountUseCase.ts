import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IGetPlaceUsersRatingCountUseCase {
  place_uuid: string;
}

interface CountResponse {
  count: BigInt;
  total_count: BigInt;
  rating: number;
}

export class GetPlaceUsersRatingCountUseCase {
  async execute({ place_uuid }: IGetPlaceUsersRatingCountUseCase) {
    try {
      if (!place_uuid) {
        throw new CustomError('Place uuid is missing', 400);
      }

      const results: CountResponse[] = await prisma.$queryRaw`
        select 
          count(pur.rating),
          (
            select
              count(uuid)
            from 
              place_users_ratings
            where
              is_active = true
          ) as total_count,
          pur.rating 
        from 
          place_users_ratings pur 
          inner join users u on u.uuid = pur.user_uuid 
        where 
          pur.place_uuid = ${place_uuid} 
          and pur.is_active = true 
        group by 
          pur.rating 
        order by 
          pur.rating desc;
    `;

      return results.map((result) => ({
        count: Number(result.count),
        total_count: Number(result.total_count),
        rating: result.rating,
      }));
    } catch (error: any) {
      throw new CustomError(error.message, error.status | 500);
    }
  }
}
