import { Request, Response } from 'express';
import { CreateOwnerUseCase } from '../useCases/createOwner/CreateOwnerUseCase';

export class CreateOwnerController {
  async handle(req: Request, res: Response) {
    try {
      const createOwnerUseCase = new CreateOwnerUseCase();

      const params = req.body;

      const result = await createOwnerUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
