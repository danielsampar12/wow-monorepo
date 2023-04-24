import { Request, Response } from 'express';
import {
  CreateArticleUseCase,
  PrismaArticle,
} from '../useCases/createArticle/CreateArticleUseCase';

export class CreateArticleController {
  async handle(req: Request, res: Response) {
    try {
      const createArticlesUseCase = new CreateArticleUseCase();

      const data: PrismaArticle = {
        ...req.body,
        created_user_uuid: req.client_uuid,
        updated_user_uuid: req.client_uuid,
      };

      const result = await createArticlesUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
