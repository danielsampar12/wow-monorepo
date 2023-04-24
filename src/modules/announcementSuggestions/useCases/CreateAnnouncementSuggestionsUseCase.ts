import { AnnouncementSuggetion } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';
import { CustomError } from '../../../utils/CustomError';
import { getMissingData } from '../../../utils/getMissingData';

export type ICreateAnnoucenmentSuggetionsUseCase = Omit<
  AnnouncementSuggetion,
  'uuid' | 'created_at' | 'updated_at' | 'visualized'
>;

export class CreateAnnouncementSuggestionsUseCase {
  async execute({
    company_responsible,
    created_user_uuid,
    message,
    name,
    updated_user_uuid,
    user_uuid,
    phone,
  }: ICreateAnnoucenmentSuggetionsUseCase) {
    try {
      if (
        !name ||
        !company_responsible ||
        !message ||
        !user_uuid ||
        !created_user_uuid ||
        !updated_user_uuid ||
        !phone
      ) {
        const getMissingProp = getMissingData({
          name,
          message,
          company_responsible,
          user_uuid,
          created_user_uuid,
          updated_user_uuid,
          phone,
        });

        throw new CustomError(`Missing data: ${getMissingProp}`, 400);
      }

      return await prisma.announcementSuggetion.create({
        data: {
          company_responsible,
          created_user_uuid,
          message,
          name,
          updated_user_uuid,
          user_uuid,
          phone,
        },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
