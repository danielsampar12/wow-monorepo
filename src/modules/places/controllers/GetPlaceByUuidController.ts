import { Request, Response } from 'express';
import { GetPlaceByUuidUseCase } from '../useCases/getPlaceByUuid/GetPlaceByUuidUseCase';

export class GetPlaceByUuidController {
  async handle(req: Request, res: Response) {
    try {
      const getPlaceByUuidUseCase = new GetPlaceByUuidUseCase();

      const { uuid } = req.params;

      const result = await getPlaceByUuidUseCase.execute({ placeUuid: uuid });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
