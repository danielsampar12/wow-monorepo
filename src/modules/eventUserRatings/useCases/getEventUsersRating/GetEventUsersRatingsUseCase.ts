import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IGetEventUsersRatingsUseCase {
  event_uuid: string;
}

export class GetEventUsersRatingsUseCase {
  async execute({ event_uuid }: IGetEventUsersRatingsUseCase) {
    try {
      if (!event_uuid) {
        throw new CustomError('Event uuid is missing', 400);
      }

      return await prisma.$queryRaw`
        select 
          eur.rating rating, 
          eur.description description, 
          u."name" user_name
        from 
          event_users_ratings eur 
          inner join users u on u.uuid = eur.user_uuid 
        where 
          eur.event_uuid = ${event_uuid}
          and eur.is_active = true
        order by
          eur.rating desc;
      `;
    } catch (error: any) {
      throw new CustomError(error.message, error.status | 500);
    }
  }
}
