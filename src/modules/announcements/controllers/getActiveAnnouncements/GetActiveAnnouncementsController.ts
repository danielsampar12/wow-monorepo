import { Request, Response } from 'express';
import { GetActiveAnouncementsUseCase } from '../../useCases/getActiveAnnouncements/GetActiveAnouncementsUseCase';

export class GetActiveAnnouncementsController {
  async handle(req: Request, res: Response) {
    try {
      const getActiveAnnouncementsUseCase = new GetActiveAnouncementsUseCase();

      const announcements = await getActiveAnnouncementsUseCase.execute();

      return res.json(announcements).status(200);
    } catch (error) {
      return res
        .status(500)
        .send('Something went wrong on getting active announcements');
    }
  }
}
