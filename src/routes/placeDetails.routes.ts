import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreatePlaceDetailController } from '../modules/placeDetails/controller/CreatePlaceDetailCrontroller';

const placeDetailsRouter = Router();

const createPlaceDetailController = new CreatePlaceDetailController();

placeDetailsRouter.post('/create', ensureAuthenticatedClient, createPlaceDetailController.handle);

export { placeDetailsRouter };
