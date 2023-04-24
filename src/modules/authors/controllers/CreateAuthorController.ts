import { Request, Response } from 'express';
import {
  CreateAuthorUseCase,
  ICreateAuthorUseCase,
} from '../useCases/createAuthor/CreateAuthorUseCase';

export class CreateAuthorController {
  async handle(req: Request, res: Response) {
    try {
      const createAuthorsUseCase = new CreateAuthorUseCase();

      const data: ICreateAuthorUseCase = {
        ...req.body,
        user_uuid: req.client_uuid,
      };

      const result = await createAuthorsUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
