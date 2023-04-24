import { Request, Response } from 'express';
import { DeleteUserUseCase } from '../useCases/deleteUser/DeleteUserUseCase';

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const deleteUserUseCase = new DeleteUserUseCase();

      const { uuid } = req.params;

      const result = await deleteUserUseCase.execute({ uuid });

      const response = {
        data: result,
        message: 'OK.',
      };

      return res.json(response).status(200);
    } catch (error) {
      return res.status(400).send('Something went wrong on delete user.');
    }
  }
}
