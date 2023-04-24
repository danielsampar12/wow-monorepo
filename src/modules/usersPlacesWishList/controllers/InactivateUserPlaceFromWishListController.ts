import { Request, Response } from 'express';
import { InactivateUserPlaceFromWishListUseCase } from '../useCases/InactivateUserPlaceFromWishListUseCase';

export class InactivateUserPlaceFromWishListController {
  async handle(req: Request, res: Response) {
    try {
      const inactivateUserPlaceFromWishListUseCase =
        new InactivateUserPlaceFromWishListUseCase();

      const { place_uuid, user_uuid } = req.body;

      const result = await inactivateUserPlaceFromWishListUseCase.execute({
        place_uuid,
        user_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
