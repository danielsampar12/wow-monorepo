import { Request, Response } from 'express';
import { CreateCategoryUseCase } from '../useCases/createCategory/CreateCategoryUseCase';

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const createCategoryUseCase = new CreateCategoryUseCase();

      const params = req.body;

      const result = await createCategoryUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
