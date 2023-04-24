import { prisma } from '../../../../database/prismaClient';

interface ICIsPlaceOnUserWishListUseCase {
  user_uuid: string;
  place_uuid: string;
}

export class CreateUsersPlaIsPlaceOnUserWishListUseCasecesWishListUseCase {
  async execute({ place_uuid, user_uuid }: ICIsPlaceOnUserWishListUseCase) {
    try {
      const count = await prisma.place.count({
        where: {
          is_active: true,
          users_on_wish_list: {
            some: {
              user_uuid,
              place_uuid,
            },
          },
        },
      });

      return !!count;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
