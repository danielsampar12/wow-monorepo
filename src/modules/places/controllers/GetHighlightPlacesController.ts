import { Request, Response } from 'express';
import { GetHighlightPlacesUseCase } from '../useCases/getHighlightPlaces/GetHighlightPlacesUseCase';

export class GetHighlightPlacesController {
  async handle(req: Request, res: Response) {
    try {
      const { user_uuid } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const getHighlightPlacesUseCase = new GetHighlightPlacesUseCase();

      const result = await getHighlightPlacesUseCase.execute({ user_uuid, location });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
