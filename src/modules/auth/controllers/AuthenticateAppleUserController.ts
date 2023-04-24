import { Request, Response } from 'express';
import { AuthenticateAppleUserUseCase } from '../useCases/authenticateAppleUser/AuthenticateAppleUserUseCase';

export class AuthenticateAppleUserController {
  async handle(req: Request, res: Response) {
    try {
      const { identityToken, fullName } = req.body;

      const authenticateAppleUserUseCase = new AuthenticateAppleUserUseCase();

      const result = await authenticateAppleUserUseCase.execute({
        identityToken,
        fullName,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status).send(error.message);
    }
  }
}
