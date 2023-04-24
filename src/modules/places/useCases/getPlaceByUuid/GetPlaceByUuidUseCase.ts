import { prisma } from '../../../../database/prismaClient';

interface GetPlaceByUuid {
  placeUuid: string;
}

export class GetPlaceByUuidUseCase {
  async execute({ placeUuid }: GetPlaceByUuid) {
    try {
      return await prisma.place.findUnique({
        where: {
          uuid: placeUuid,
        },
        include: {
          place_tags: true,
          place_details: true,
          place_age_groups: true,
          place_categories: true,
          place_users_ratings: true,
          users_on_wish_list: {
            select: {
              user_uuid: true,
            },
          },
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
