import { Request, Response } from 'express';
import { excludeUserKey } from '../../../utils/excludeUserKey';
import { UpdateUserUseCase } from '../useCases/updateUser/UpdateUserUseCase';

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    try {
      const updateUserUseCase = new UpdateUserUseCase();

      const { uuid } = req.params;

      const data = req.body;

      const result = await updateUserUseCase.execute({ uuid, data });

      return res.json(excludeUserKey(result, 'password')).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
