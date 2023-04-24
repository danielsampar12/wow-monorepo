import { Request, Response } from 'express';

import { GetPlaceUsersRatingCountUseCase } from '../useCases/getPlaceUsersRatingCount/GetPlaceUsersRatingCountUseCase';

export class GetPlaceUsersRatingCountController {
  async handle(req: Request, res: Response) {
    try {
      const getPlaceUsersRatingCountUseCase =
        new GetPlaceUsersRatingCountUseCase();

      const { place_uuid } = req.params;

      const result = await getPlaceUsersRatingCountUseCase.execute({
        place_uuid,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
