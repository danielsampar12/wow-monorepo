import { Request, Response } from 'express';
import { DeleteEventScheduleUseCase } from '../useCases/deleteEventSchedule/DeleteEventScheduleUseCase';

export class DeleteEventScheduleController {
  async handle(req: Request, res: Response) {
    try {
      const deleteEventScheduleUseCase = new DeleteEventScheduleUseCase();

      const { uuid } = req.params;

      const result = await deleteEventScheduleUseCase.execute({ uuid });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
