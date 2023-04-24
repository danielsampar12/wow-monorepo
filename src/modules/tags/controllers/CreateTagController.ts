import { Request, Response } from 'express';
import { CreateTagUseCase } from '../useCases/createTag/CreateTagUseCase';

export class CreateTagController {
  async handle(req: Request, res: Response) {
    try {
      const createTagUseCase = new CreateTagUseCase();

      const params = req.body;

      const result = await createTagUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
