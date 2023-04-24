import { Request, Response } from 'express';
import { CreateEventUserRatingsUseCase } from '../useCases/createEventUserRating/CreateEventUserRatingsUseCase';

export class CreateEventUserRatingsController {
  async handle(req: Request, res: Response) {
    try {
      const createEventUserRatingsUseCase = new CreateEventUserRatingsUseCase();

      const data = req.body;

      const result = await createEventUserRatingsUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
