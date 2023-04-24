import { Request, Response } from 'express';
import { UpdateChildUseCase } from '../useCases/updateChild/UpdateChildUseCase';

export class UpdateChildController {
  async handle(req: Request, res: Response) {
    try {
      const updateChildUseCase = new UpdateChildUseCase();

      const { child_uuid } = req.params;

      const { name, birthdate, kinship } = req.body;

      const child = {
        name,
        kinship,
        birthdate,
      };

      const result = await updateChildUseCase.execute({ child, child_uuid });

      return res.json(result).status(201);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
