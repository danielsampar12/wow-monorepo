import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';

interface IInactivateUserEventFromWishListUseCase {
  user_uuid: string;
  event_uuid: string;
}

export class InactivateUserEventFromWishListUseCase {
  async execute({
    event_uuid,
    user_uuid,
  }: IInactivateUserEventFromWishListUseCase) {
    try {
      if (!event_uuid || !user_uuid) {
        throw new CustomError('Missing user or event uuid.', 400);
      }

      return await prisma.userEventWishlist.updateMany({
        where: {
          AND: [
            {
              user_uuid,
            },
            {
              event_uuid,
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
