import { Request, Response } from 'express';
import { VerifyPasswordRecoveryTokenUseCase } from '../useCases/verifyPasswordRecoveryTokenUseCase/VerifyPasswordRecoveryTokenUseCase';

export class VerifyPasswordRecoveryTokenController {
  async handle(req: Request, res: Response) {
    try {
      const verifyPasswordRecoveryTokenUseCase = new VerifyPasswordRecoveryTokenUseCase();

      const params = req.body;

      const result = await verifyPasswordRecoveryTokenUseCase.execute(params);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
