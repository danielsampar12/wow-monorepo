import { Request, Response } from 'express';
import { GetEventFromUserWishListUseCase } from '../useCases/GetEventFromUserWishListUseCase';

export class GetEventsFromUserWishListController {
  async handle(req: Request, res: Response) {
    try {
      const getEventsFromUserWishListUseCase =
        new GetEventFromUserWishListUseCase();

      const { uuid } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const result = await getEventsFromUserWishListUseCase.execute({
        user_uuid: uuid,
        location
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
