import { ArticleImage } from '@prisma/client';
import { prisma } from '../../../database/prismaClient';

type PrsimaArticleImage = Omit<
  ArticleImage,
  'uuid' | 'created_at' | 'updated_at' | 'url'
>;

interface Image extends PrsimaArticleImage {
  image_id: string;
  variant_name: string;
}

export interface CreateArticleImages {
  images: Image[];
}

export class CreateArticleImagesUseCase {
  async execute({ images }: CreateArticleImages) {
    try {
      return await prisma.articleImage.createMany({
        data: images.map((image) => ({
          ...image,
          url: `${process.env.CLOUD_FLARE_URL}/${image.image_id}/${image.variant_name}`,
        })),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
