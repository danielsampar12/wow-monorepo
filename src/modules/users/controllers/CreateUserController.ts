import { Request, Response } from 'express';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const createUserUseCase = new CreateUserUseCase();

      const params = req.body;

      const result = await createUserUseCase.execute(params);

      const response = {
        result,
        message: 'OK.',
      };

      return res.json(response).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
