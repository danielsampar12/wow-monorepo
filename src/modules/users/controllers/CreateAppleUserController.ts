import { Request, Response } from 'express';
import { CreateAppleUserUseCase } from '../useCases/createAppleUser/CreateAppleUserUseCase';

export class CreateAppleUserController {
  async handle(req: Request, res: Response) {
    try {
      const createAppleUserUseCase = new CreateAppleUserUseCase();

      const params = req.body;

      const result = await createAppleUserUseCase.execute(params);

      console.log({ result });

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
