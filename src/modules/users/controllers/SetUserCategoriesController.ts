import { Request, Response } from 'express';
import { excludeUserKey } from '../../../utils/excludeUserKey';
import { SetUserCategoriesUseCase } from '../useCases/setUserCategories/SetUserCategoriesUseCase';

export class SetUserCategoriesController {
  async handle(req: Request, res: Response) {
    try {
      const setUserCategoriesUseCase = new SetUserCategoriesUseCase();

      const { categories_uuids, user_uuid } = req.body;

      const result = await setUserCategoriesUseCase.execute({
        categories_uuids,
        user_uuid,
      });

      return res.json(excludeUserKey(result, 'password')).status(200);
    } catch (error: any) {
      return res.status(500).send(error);
    }
  }
}
