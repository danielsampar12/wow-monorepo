import { Request, Response } from 'express';
import { GetEventsUseCase } from '../useCases/getEventsByMonth/GetEventsByMonthUseCase';

export class GetEventsByMonthController {
  async handle(req: Request, res: Response) {
    try {
      const getEventsUseCase = new GetEventsUseCase();

      const { date } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const result = await getEventsUseCase.execute({ date, location });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
