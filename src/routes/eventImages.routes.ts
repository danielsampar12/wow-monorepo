import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateEventImageController } from '../modules/eventImages/controllers/CreateEventImageController';

const eventImagesRouter = Router();

const createEventImageController = new CreateEventImageController();

eventImagesRouter.post('/create', ensureAuthenticatedClient, createEventImageController.handle);

export { eventImagesRouter };
