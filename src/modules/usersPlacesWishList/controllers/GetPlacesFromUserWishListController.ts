import { Request, Response } from 'express';
import { GetPlacesFromUserWishListUseCase } from '../useCases/GetPlacesFromUserWishListUseCase';

export class GetPlacesFromUserWishListController {
  async handle(req: Request, res: Response) {
    try {
      const getPlacesFromUserWishListUseCase =
        new GetPlacesFromUserWishListUseCase();

      const { uuid } = req.params;

      const { latitude, longitude } = req.query;

      const location = latitude && longitude ? { latitude: parseFloat(latitude as string), longitude: parseFloat(longitude as string) } : undefined;

      const result = await getPlacesFromUserWishListUseCase.execute({
        user_uuid: uuid,
        location
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
