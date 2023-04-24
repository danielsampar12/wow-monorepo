import { Request, Response } from 'express';
import { EventImagesUseCase } from '../useCases/EventImagesUseCase'

export class EventImagesController {
  async handle(req: Request, res: Response) {
    try {
      const eventImagesUseCase = new EventImagesUseCase()
    } catch(error: any) {
      return res.status(500).send(error.message);
    }
  }
}
