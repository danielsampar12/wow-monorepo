import { Request, Response } from 'express';
import { GetCategoriesUseCase } from '../useCases/getCategories/GetCategoriesUseCase';

export class GetCategoriesController {
  async handle(req: Request, res: Response) {
    try {
      const getCategoriesUseCase = new GetCategoriesUseCase();

      const result = await getCategoriesUseCase.execute({
        user_uuid: req.client_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res
        .status(error.status || 500)
        .send(error.message || 'Something went wrong getting categories.');
    }
  }
}
