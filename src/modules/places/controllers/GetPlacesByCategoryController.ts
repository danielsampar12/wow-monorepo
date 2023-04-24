import { Request, Response } from 'express';
import { GetPlacesByCategoryUseCase } from '../useCases/getPlacesByCategory/GetPlaceByCategoryUseCase';

export class GetPlacesByCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const { categoryUuid } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const getPlaceByCategoryUseCase = new GetPlacesByCategoryUseCase();

      const result = await getPlaceByCategoryUseCase.execute({ categoryUuid, location });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status).send(error.message);
    }
  }
}
