import { Request, Response } from 'express';
import { CreatePlaceUserRatingsUseCase } from '../useCases/createPlaceUserRating/CreatePlaceUserRatingsUseCase';

export class CreatePlaceUserRatingsController {
  async handle(req: Request, res: Response) {
    try {
      const createPlaceUserRatingsUseCase = new CreatePlaceUserRatingsUseCase();

      const data = req.body;

      const result = await createPlaceUserRatingsUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
