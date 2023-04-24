import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IGetPlaceUsersRatingsUseCase {
  place_uuid: string;
}

export class GetPlaceUsersRatingsUseCase {
  async execute({ place_uuid }: IGetPlaceUsersRatingsUseCase) {
    try {
      if (!place_uuid) {
        throw new CustomError('Place uuid is missing', 400);
      }

      return await prisma.$queryRaw`
        select 
          pur.rating rating, 
          pur.description description, 
          u."name" user_name
        from 
          place_users_ratings pur 
          inner join users u on u.uuid = pur.user_uuid 
        where 
          pur.place_uuid = ${place_uuid}
          and pur.is_active = true
        order by
          pur.rating desc;
      `;
    } catch (error: any) {
      throw new CustomError(error.message, error.status | 500);
    }
  }
}
