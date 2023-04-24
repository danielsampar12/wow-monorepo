import { Request, Response } from 'express';
import { CreateChildUseCase } from '../useCases/createChild/CreateChildUseCase';

export class CreateChildController {
  async handle(req: Request, res: Response) {
    try {
      const createChildrenUseCase = new CreateChildUseCase();

      const child = req.body;

      const result = await createChildrenUseCase.execute({ child });

      return res.json(result).status(201);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
