import { Request, Response } from 'express';
import { GetPlacesUseCase } from '../useCases/getPlaces/GetPlacesUseCase';

export class GetPlacesController {
  async handle(req: Request, res: Response) {
    try {
      const getPlacesUseCase = new GetPlacesUseCase();

      const result = await getPlacesUseCase.execute();

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
