import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../useCases/authenticateUser/AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const authenticateUserUseCase = new AuthenticateUserUseCase();

      const result = await authenticateUserUseCase.execute({ email, password });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
