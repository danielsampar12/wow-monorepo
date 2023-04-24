import { Request, Response } from 'express';
import { GetUpNextEventsUseCase } from '../useCases/getUpNextEvents/GetUpNextEventsUseCase';

export class GetUpNextEventsController {
  async handle(req: Request, res: Response) {
    try {
      const getUpNextEventsUseCase = new GetUpNextEventsUseCase();

      const { date } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const result = await getUpNextEventsUseCase.execute({ date, location });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
