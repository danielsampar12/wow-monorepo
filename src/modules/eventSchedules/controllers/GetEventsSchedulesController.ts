import { Request, Response } from 'express';

import { GetEventsSchedulesUseCase } from '../useCases/getEventsSchedules/GetEventsSchedulesUseCase';

export class GetEventsSchedulesController {
  async handle(req: Request, res: Response) {
    try {
      const getEventsSchedulesUseCase = new GetEventsSchedulesUseCase();

      const result = await getEventsSchedulesUseCase.execute();

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
