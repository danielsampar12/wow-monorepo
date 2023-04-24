import { Request, Response } from 'express';
import { GetLastMandatoryVersionUseCase } from '../useCases/getLastMandatoryVersion/GetLastMandatoryVersionUseCase';

export class GetLastMandatoryVersionController {
  async handle(req: Request, res: Response) {
    try {
      const getLastMandatoryVersionUseCase = new GetLastMandatoryVersionUseCase();

      const result = await getLastMandatoryVersionUseCase.execute();

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
