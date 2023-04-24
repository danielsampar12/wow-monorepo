import { Request, Response } from 'express';
import { excludeUserKey } from '../../../utils/excludeUserKey';
import { SetUserAgeGroupsUseCase } from '../useCases/setUserAgeGroups/SetUserAgeGroupsUseCase';

export class SetUserAgeGroupsController {
  async handle(req: Request, res: Response) {
    try {
      const setUserAgeGroupsUseCase = new SetUserAgeGroupsUseCase();

      const { age_groups_uuids, user_uuid } = req.body;

      const result = await setUserAgeGroupsUseCase.execute({
        age_groups_uuids,
        user_uuid,
      });

      return res.json(excludeUserKey(result, 'password')).status(200);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
