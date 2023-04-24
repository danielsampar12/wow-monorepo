import { Request, Response } from 'express';
import { CreateUsersPlacesWishListUseCase } from '../useCases/CreateUsersPlacesWishListUseCase';

export class CreateUsersPlacesWishListController {
  async handle(req: Request, res: Response) {
    try {
      const createUsersPlacesWishListUseCase =
        new CreateUsersPlacesWishListUseCase();

      const { user_uuid, place_uuid } = req.body;

      const result = await createUsersPlacesWishListUseCase.execute({
        user_uuid,
        place_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
