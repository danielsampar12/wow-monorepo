import { Request, Response } from 'express';
import {
  CreateArticleImages,
  CreateArticleImagesUseCase,
} from '../useCases/CreateArticleImagesUseCase';

export class ArticleImagesController {
  async handle(req: Request, res: Response) {
    try {
      const createArticleImagesUseCase = new CreateArticleImagesUseCase();

      const data: CreateArticleImages = {
        ...req.body,
        created_user_uuid: req.client_uuid,
        updated_user_uuid: req.client_uuid,
      };

      const result = await createArticleImagesUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
