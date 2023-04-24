import { Router } from 'express';
import { CreatePlaceController } from '../modules/places/controllers/CreatePlaceController';
import { GetHighlightPlacesController } from '../modules/places/controllers/GetHighlightPlacesController';
import { GetPlacesByCategoryController } from '../modules/places/controllers/GetPlacesByCategoryController';
import { GetPlaceByUuidController } from '../modules/places/controllers/GetPlaceByUuidController';
import { GetPlacesController } from '../modules/places/controllers/GetPlacesController';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';

const placesRouter = Router();

const getPlacesController = new GetPlacesController();
const getPlaceByUUidController = new GetPlaceByUuidController();
const getHighlightPlacesController = new GetHighlightPlacesController();
const getPlacesByCategoryController = new GetPlacesByCategoryController();

const createPlaceController = new CreatePlaceController();

placesRouter.get('/', ensureAuthenticatedClient, getPlacesController.handle);
placesRouter.get('/highlights/:user_uuid', ensureAuthenticatedClient, getHighlightPlacesController.handle);
placesRouter.get(
  '/getByCategory/:categoryUuid',
  ensureAuthenticatedClient,
  getPlacesByCategoryController.handle,
);
placesRouter.get('/getByUuid/:uuid', ensureAuthenticatedClient, getPlaceByUUidController.handle);

placesRouter.post('/create', ensureAuthenticatedClient, createPlaceController.handle);

export { placesRouter };
