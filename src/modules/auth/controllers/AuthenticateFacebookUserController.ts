import { Request, Response } from 'express';
import { AuthenticateFacebookUserUseCase } from '../useCases/authenticateFacebookUser/AuthenticateFacebookUserUseCase';

export class AuthenticateFacebookUserController {
  async handle(req: Request, res: Response) {
    try {

      const { accessToken } = req.body;

      const authenticateFacebookUserUseCase =
        new AuthenticateFacebookUserUseCase();

      const result = await authenticateFacebookUserUseCase.execute({
        accessToken,
      });

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
