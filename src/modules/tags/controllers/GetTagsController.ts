import { Request, Response } from 'express';
import { GetTagsUseCase } from '../useCases/getTags/GetTagsUseCase';

export class GetTagsController {
  async handle(req: Request, res: Response) {
    try {
      const getTagsUseCase = new GetTagsUseCase();

      const result = await getTagsUseCase.execute();

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
