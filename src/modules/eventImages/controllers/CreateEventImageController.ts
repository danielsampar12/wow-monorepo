import { Request, Response } from 'express';
import { CreateEventImageUseCase } from '../useCases/createEventImage/CreateEventImageUseCase';

export class CreateEventImageController {
  async handle(req: Request, res: Response) {
    try {
      const createEventImageUseCase = new CreateEventImageUseCase();

      const data = req.body;

      const result = await createEventImageUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
