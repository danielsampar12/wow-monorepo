import { PlaceDetail } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

type CreatePlaceDetail = Omit<
  PlaceDetail,
  'created_at' | 'updated_at' | 'uuid'
>;

export class CreatePlaceDetailUseCase {
  async execute(data: CreatePlaceDetail) {
    try {
      if (!data.place_uuid) {
        throw new Error('Place uuid is missing');
      }

      return await prisma.placeDetail.create({
        data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
