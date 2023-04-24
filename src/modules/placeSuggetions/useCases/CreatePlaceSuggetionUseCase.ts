import { PlaceSuggestion } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';
import { getMissingData } from '../../../utils/getMissingData';

export type ICreatePlaceSuggetionsUseCase = Omit<
  PlaceSuggestion,
  'uuid' | 'created_at' | 'updated_at' | 'visualized'
>;

export class CreatePlaceSuggetionsUseCase {
  async execute({
    name,
    observation,
    phone,
    user_uuid,
    created_user_uuid,
    updated_user_uuid,
  }: ICreatePlaceSuggetionsUseCase) {
    try {
      if (
        !name ||
        !observation ||
        !phone ||
        !user_uuid ||
        !created_user_uuid ||
        !updated_user_uuid
      ) {
        const getMissingProp = getMissingData({
          name,
          observation,
          phone,
          user_uuid,
          created_user_uuid,
          updated_user_uuid,
        });

        throw new CustomError(`Missing data: ${getMissingProp}`, 400);
      }

      if (phone.length < 10) {
        throw new CustomError('Invalid phone number', 400);
      }

      return await prisma.placeSuggestion.create({
        data: {
          name,
          observation,
          phone,
          user_uuid,
          created_user_uuid,
          updated_user_uuid,
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
