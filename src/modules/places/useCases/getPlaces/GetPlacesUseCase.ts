import { prisma } from '../../../../database/prismaClient';

export class GetPlacesUseCase {
  async execute() {
    try {
      return await prisma.place.findMany({
        where: {
          is_active: true
        },
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
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
