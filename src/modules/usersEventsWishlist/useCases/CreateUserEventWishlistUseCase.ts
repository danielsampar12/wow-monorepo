import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';

interface ICreateUserEventWishlistUseCase {
  event_uuid: string;
  user_uuid: string;
}

export class CreateUserEventWishlistUseCase {
  async execute({ event_uuid, user_uuid }: ICreateUserEventWishlistUseCase) {
    try {
      if (!event_uuid || !user_uuid) {
        throw new CustomError('Missing event or user uuid', 400);
      }

      return await prisma.userEventWishlist.create({
        data: {
          event_uuid,
          user_uuid,
        },
        include: {
          event: {
            include: {
              schedules: {
                select: {
                  date: true,
                },
              },
              event_images: {
                select: {
                  url: true,
                },
              },
              event_tags: {
                select: {
                  description: true,
                },
              },
            },
          },
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
