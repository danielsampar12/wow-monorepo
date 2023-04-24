import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';

interface IDeleteUserPlaceFromWishListUseCase {
  place_uuid: string;
  user_uuid: string;
}

export class InactivateUserPlaceFromWishListUseCase {
  async execute({
    place_uuid,
    user_uuid,
  }: IDeleteUserPlaceFromWishListUseCase) {
    try {
      if (!place_uuid || !user_uuid) {
        throw new CustomError('Missing place or user uuid', 400);
      }

      return await prisma.userPlaceWishlist.updateMany({
        where: {
          AND: [
            {
              user_uuid,
            },
            {
              place_uuid,
            },
          ],
        },
        data: {
          is_active: false,
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
