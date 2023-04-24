import { Request, Response } from 'express';
import { GetAuthorsUseCase } from '../useCases/getAuthors/GetAuthorsUseCase';

export class GetAuthorsController {
  async handle(req: Request, res: Response) {
    try {
      const getAuthorsUseCase = new GetAuthorsUseCase();

      const result = await getAuthorsUseCase.execute();

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
