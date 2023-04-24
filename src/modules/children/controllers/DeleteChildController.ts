import { Request, Response } from 'express';
import { DeleteChildUseCase } from '../useCases/deleteChild/DeleteChildUseCase';

export class DeleteChildController {
  async handle(req: Request, res: Response) {
    try {
      const deleteChildUseCase = new DeleteChildUseCase();

      const { child_uuid } = req.body;

      const result = await deleteChildUseCase.execute({ child_uuid });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
