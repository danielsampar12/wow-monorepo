import { Request, Response } from 'express';

import { GetPlaceUsersRatingsUseCase } from '../useCases/getPlaceUsersRating/GetPlaceUsersRatingsUseCase';

export class GetPlaceUsersRatingController {
  async handle(req: Request, res: Response) {
    try {
      const getPlaceUserRatingsUseCase = new GetPlaceUsersRatingsUseCase();

      const { place_uuid } = req.params;

      const result = await getPlaceUserRatingsUseCase.execute({ place_uuid });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
