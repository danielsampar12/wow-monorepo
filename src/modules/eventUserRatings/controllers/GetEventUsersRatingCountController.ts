import { Request, Response } from 'express';

import { GetEventUsersRatingCountUseCase } from '../useCases/getEventUsersRatingCount/GetEventUsersRatingCountUseCase';

export class GetEventUsersRatingCountController {
  async handle(req: Request, res: Response) {
    try {
      const getEventUsersRatingCountUseCase =
        new GetEventUsersRatingCountUseCase();

      const { event_uuid } = req.params;

      const result = await getEventUsersRatingCountUseCase.execute({
        event_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
