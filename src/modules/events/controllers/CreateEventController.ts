import { Request, Response } from 'express';
import { CreateEventUseCase } from '../useCases/createEvent/CreateEventUseCase';

export class CreateEventController {
  async handle(req: Request, res: Response) {
    try {
      const createEventeUseCase = new CreateEventUseCase();

      const data = req.body;

      const result = await createEventeUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
