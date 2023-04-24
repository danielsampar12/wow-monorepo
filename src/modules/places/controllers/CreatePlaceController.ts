import { Request, Response } from 'express';
import { CreatePlaceUseCase } from '../useCases/createPlace/CreatePlaceUseCase';

export class CreatePlaceController {
  async handle(req: Request, res: Response) {
    try {
      const createPlaceUseCase = new CreatePlaceUseCase();

      const params = req.body;

      const result = await createPlaceUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
