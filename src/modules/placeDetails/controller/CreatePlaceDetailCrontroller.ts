import { Request, Response } from 'express';
import { CreatePlaceDetailUseCase } from '../useCases/CreatePlaceDetailUseCase';

export class CreatePlaceDetailController {
  async handle(req: Request, res: Response) {
    try {
      const createPlaceDetailUseCase = new CreatePlaceDetailUseCase();

      const params = req.body;

      const result = await createPlaceDetailUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
