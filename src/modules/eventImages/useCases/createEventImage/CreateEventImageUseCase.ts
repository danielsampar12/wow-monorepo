import { EventImage } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

type PrismaEventImage = Omit<
  EventImage,
  'uuid' | 'created_at' | 'updated_at' | 'url'
>;

interface ICreateEventImageUseCase extends PrismaEventImage {
  image_id: string;
  variant_name: string;
}

export class CreateEventImageUseCase {
  async execute({ image_id, variant_name, ...rest }: ICreateEventImageUseCase) {
    try {
      if (!process.env.CLOUD_FLARE_URL) {
        throw new CustomError('Missing CDN environment variable.', 500);
      }

      if (!image_id || !variant_name) {
        throw new CustomError('Missing image id or variant name.', 400);
      }

      const url = `${process.env.CLOUD_FLARE_URL}/${image_id}/${variant_name}`;

      const data = {
        ...rest,
        url,
      };

      return await prisma.eventImage.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
