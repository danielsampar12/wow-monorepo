import { Request, Response } from 'express';
import { CreateGoogleUserUseCase } from '../useCases/createGoogleUser/CreateGoogleUserUseCase';

export class CreateGoogleUserController {
  async handle(req: Request, res: Response) {
    try {
      const createGoogleUserUseCase = new CreateGoogleUserUseCase();

      const params = req.body;

      const result = await createGoogleUserUseCase.execute(params);

      const response = {
        result,
        message: 'OK.',
      };

      return res.json(response).status(200);
    } catch (error: any) {
      return res.status(500).send(error.message);
    }
  }
}
