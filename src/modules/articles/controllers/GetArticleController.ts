import { Request, Response } from 'express';
import { GetArticleUseCase } from '../useCases/getArticles/GetArticleUseCase';

export class GetArticleController {
  async handle(req: Request, res: Response) {
    try {
      const getArticleUseCase = new GetArticleUseCase();

      const { uuid } = req.params;

      const result = await getArticleUseCase.execute({ uuid });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
