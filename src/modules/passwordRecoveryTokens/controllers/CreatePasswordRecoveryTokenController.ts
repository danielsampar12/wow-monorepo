import { Request, Response } from 'express';
import { CreatePasswordRecoveryTokenUseCase } from '../useCases/createPasswordRecoveryToken/CreatePasswordRecoveryTokenUseCase';

export class CreatePasswordRecoveryTokenController {
  async handle(req: Request, res: Response) {
    try {
      const createPasswordRecoveryTokenUseCase = new CreatePasswordRecoveryTokenUseCase();

      const params = req.body;

      const result = await createPasswordRecoveryTokenUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
