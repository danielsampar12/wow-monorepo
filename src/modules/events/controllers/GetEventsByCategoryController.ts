import { Request, Response } from 'express';
import { GetEventsByCategoryUseCase } from '../useCases/getEventsByCategory/GetEventsByCategoryUseCase';

export class GetEventsByCategoryController {
  async handle(req: Request, res: Response) {
    try {
      const getEventsByCategoryUseCase = new GetEventsByCategoryUseCase();

      const { categoryUuid } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const result = await getEventsByCategoryUseCase.execute({ categoryUuid, location });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
