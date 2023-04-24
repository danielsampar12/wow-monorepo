import { Request, Response } from 'express';
import { DeleteCategoryUseCase } from '../useCases/deleteCategory/DeleteCategoryUseCase';

export class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { uuid } = req.params;

    const deleteCategoryUseCase = new DeleteCategoryUseCase();

    const result = await deleteCategoryUseCase.execute({ categoryUuid: uuid });

    return res.json(result).status(200);
  }
}
