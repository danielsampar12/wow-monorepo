import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IGetEventUsersRatingCountUseCase {
  event_uuid: string;
}

interface CountResponse {
  count: BigInt;
  total_count: BigInt;
  rating: number;
}

export class GetEventUsersRatingCountUseCase {
  async execute({ event_uuid }: IGetEventUsersRatingCountUseCase) {
    try {
      if (!event_uuid) {
        throw new CustomError('Event uuid is missing', 400);
      }

      const results: CountResponse[] = await prisma.$queryRaw`
        select 
          count(eur.rating),
          (
            select
              count(uuid)
            from 
              event_users_ratings
            where
              is_active = true
          ) as total_count,
          eur.rating 
        from 
          event_users_ratings eur 
          inner join users u on u.uuid = eur.user_uuid 
        where 
          eur.event_uuid = ${event_uuid} 
          and eur.is_active = true 
        group by 
          eur.rating 
        order by 
          eur.rating desc;
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
