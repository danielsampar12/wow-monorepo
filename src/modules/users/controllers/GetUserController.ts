import { Request, Response } from 'express';
import { GetUserUseCase } from '../useCases/getUser/GetUserUseCase';

export class GetUserController {
  async handle(req: Request, res: Response) {
    try {
      const getUserUseCase = new GetUserUseCase();

      const { uuid } = req.params;

      const user = await getUserUseCase.execute({ uuid });

      return res.json(user).status(200);
    } catch (error) {
      return res.status(500).send('Something went wrong on getting info.');
    }
  }
}
