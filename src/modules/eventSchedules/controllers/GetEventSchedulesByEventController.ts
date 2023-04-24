import { Request, Response } from 'express';
import { GetEventSchedulesByEventUseCase } from '../useCases/getEventsSchedulesByEvent/GetEventSchedulesByEventUseCase';

export class GetEventSchedulesByEventController {
  async handle(req: Request, res: Response) {
    try {
      const getEventSchedulesByEventUseCase =
        new GetEventSchedulesByEventUseCase();

      const { eventUuid, date } = req.params;

      const result = await getEventSchedulesByEventUseCase.execute({
        date,
        eventUuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status).send(error.message);
    }
  }
}
