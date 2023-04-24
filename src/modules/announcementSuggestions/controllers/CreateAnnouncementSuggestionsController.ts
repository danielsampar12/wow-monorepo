import { Request, Response } from 'express';
import {
  CreateAnnouncementSuggestionsUseCase,
  ICreateAnnoucenmentSuggetionsUseCase,
} from '../useCases/CreateAnnouncementSuggestionsUseCase';

export class CreateAnnouncementSuggestionsController {
  async handle(req: Request, res: Response) {
    try {
      const createAnnouncementSuggestionsUseCase =
        new CreateAnnouncementSuggestionsUseCase();

      const data = req.body as ICreateAnnoucenmentSuggetionsUseCase;

      const result = await createAnnouncementSuggestionsUseCase.execute(data);

      return res.json(result).status(200);
    } catch (error: any) {
      return res.status(error.status || 500).send(error.message);
    }
  }
}
