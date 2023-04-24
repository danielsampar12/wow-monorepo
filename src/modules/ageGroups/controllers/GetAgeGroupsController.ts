import { Request, Response } from 'express';
import { GetAgeGroupsUseCase } from '../useCases/getAgeGroups/GetAgeGroupsUseCase';

export class GetAgeGroupsController {
  async handle(req: Request, res: Response) {
    try {
      const getAgeGroupsUseCase = new GetAgeGroupsUseCase();

      const result = await getAgeGroupsUseCase.execute();

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
