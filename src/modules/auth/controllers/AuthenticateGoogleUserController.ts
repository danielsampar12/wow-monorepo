import { Request, Response } from 'express';
import { AuthenticateGoogleUserUseCase } from '../useCases/authenticateGoogleUser/AuthenticateGoogleUserUseCase';

export class AuthenticateGoogleUserController {
  async handle(req: Request, res: Response) {
    try {
      const { idToken } = req.body;

      const authenticateGoogleUserUseCase = new AuthenticateGoogleUserUseCase();

      const result = await authenticateGoogleUserUseCase.execute({ idToken });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
