import { Request, Response } from 'express';
import { UpdateUserPasswordUseCase } from '../useCases/updateUserPassword/UpdateUserPasswordUseCase';

export class UpdateUserPasswordController {
  async handle(req: Request, res: Response) {
    try {
      const updateUserPasswordUseCase = new UpdateUserPasswordUseCase();

      const params = req.body;

      const result = await updateUserPasswordUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
