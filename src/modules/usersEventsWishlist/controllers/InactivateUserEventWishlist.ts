import { Request, Response } from 'express';
import { InactivateUserEventFromWishListUseCase } from '../useCases/InactivateUserEventWishlist';

export class InactivateUserEventFromWishListController {
  async handle(req: Request, res: Response) {
    try {
      const inactivateUserEventFromWishListUseCase =
        new InactivateUserEventFromWishListUseCase();

      const { event_uuid, user_uuid } = req.body;

      const result = await inactivateUserEventFromWishListUseCase.execute({
        event_uuid,
        user_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
