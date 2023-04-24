import { Request, Response } from 'express';
import { CreateEventsSchedulesUseCase } from '../useCases/createManyEventsSchedules/CreateManyEventSchedulesUseCase';

export class CreateEventsSchedulesController {
  async handle(req: Request, res: Response) {
    try {
      const createEventsSchedulesUseCase = new CreateEventsSchedulesUseCase();

      const data = req.body;

      const result = await createEventsSchedulesUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
