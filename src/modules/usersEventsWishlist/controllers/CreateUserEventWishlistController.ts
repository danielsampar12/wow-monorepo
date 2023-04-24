import { Request, Response } from 'express';
import { CreateUserEventWishlistUseCase } from '../useCases/CreateUserEventWishlistUseCase';

export class CreateUserEventWishlistController {
  async handle(req: Request, res: Response) {
    try {
      const createUserEventWishlistUseCase =
        new CreateUserEventWishlistUseCase();

      const { user_uuid, event_uuid } = req.body;

      const result = await createUserEventWishlistUseCase.execute({
        event_uuid,
        user_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
