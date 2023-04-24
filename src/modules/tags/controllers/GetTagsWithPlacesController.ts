import { Request, Response } from 'express';

import { GetTagsWithPlacesUseCase } from '../useCases/getTagsWithPlaces/GetTagsWithPlacesUseCase';

export class GetTagsWithPlacesController {
  async handle(req: Request, res: Response) {
    try {
      const getTagWithPLacesUseCase = new GetTagsWithPlacesUseCase();

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const result = await getTagWithPLacesUseCase.execute({ location });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
