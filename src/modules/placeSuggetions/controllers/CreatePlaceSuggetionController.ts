import { Request, Response } from 'express';

import {
  CreatePlaceSuggetionsUseCase,
  ICreatePlaceSuggetionsUseCase,
} from '../useCases/CreatePlaceSuggetionUseCase';

export class CreatePlaceSuggetionsController {
  async handle(req: Request, res: Response) {
    try {
      const createPlaceSuggetionsUseCase = new CreatePlaceSuggetionsUseCase();

      const {
        name,
        phone,
        user_uuid,
        observation,
        created_user_uuid,
        updated_user_uuid,
      } = req.body as ICreatePlaceSuggetionsUseCase;

      const result = await createPlaceSuggetionsUseCase.execute({
        name,
        phone,
        user_uuid,
        observation,
        created_user_uuid,
        updated_user_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
