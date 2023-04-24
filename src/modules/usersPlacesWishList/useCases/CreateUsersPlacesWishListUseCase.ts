import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';

interface ICreateUsersPlacesWishListUseCase {
  user_uuid: string;
  place_uuid: string;
}

export class CreateUsersPlacesWishListUseCase {
  async execute({ place_uuid, user_uuid }: ICreateUsersPlacesWishListUseCase) {
    try {
      if (!place_uuid || !user_uuid) {
        throw new CustomError('Missing place or user uuid', 400);
      }

      return await prisma.userPlaceWishlist.create({
        data: {
          user_uuid: user_uuid,
          place_uuid: place_uuid,
        },
        include: {
          place: {
            include: {
              place_tags: true,
              place_images: {
                orderBy: {
                  priority: 'asc',
                },
              },
              place_details: true,
              place_age_groups: true,
              place_categories: true,
              place_users_ratings: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
