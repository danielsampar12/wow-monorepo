import { Place } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

type CreatePlacePrisma = Omit<Place, 'created_at' | 'updated_at' | 'uuid'>;

interface CreatePlace extends CreatePlacePrisma {
  place_tags_uuids: string[];
  place_details_uuids?: string[];
  place_categories_uuids: string[];
  place_age_groups_uuids: string[];
}

export class CreatePlaceUseCase {
  async execute({
    place_tags_uuids,
    place_details_uuids = [],
    place_categories_uuids,
    place_age_groups_uuids,
    ...params
  }: CreatePlace) {
    try {
      return await prisma.place.create({
        data: {
          ...params,
          place_tags: {
            connect: place_tags_uuids.map((uuid) => ({ uuid })),
          },
          place_details: {
            connect: place_details_uuids.map((uuid) => ({ uuid })),
          },
          place_categories: {
            connect: place_categories_uuids.map((uuid) => ({ uuid })),
          },
          place_age_groups: {
            connect: place_age_groups_uuids.map((uuid) => ({ uuid })),
          },
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
