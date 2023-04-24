import { Request, Response } from 'express';

import { GetEventUsersRatingsUseCase } from '../useCases/getEventUsersRating/GetEventUsersRatingsUseCase';

export class GetEventUsersRatingController {
  async handle(req: Request, res: Response) {
    try {
      const getEventUserRatingsUseCase = new GetEventUsersRatingsUseCase();

      const { event_uuid } = req.params;

      const result = await getEventUserRatingsUseCase.execute({ event_uuid });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
