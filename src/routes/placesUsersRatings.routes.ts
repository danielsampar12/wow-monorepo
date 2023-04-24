import { Router } from 'express';
import { GetPlaceUsersRatingController } from '../modules/placeUserRatings/controllers/GetPlaceUsersRatingController';
import { CreatePlaceUserRatingsController } from '../modules/placeUserRatings/controllers/CreatePlaceUserRatingsController';
import { GetPlaceUsersRatingCountController } from '../modules/placeUserRatings/controllers/GetPlaceUsersRatingCountController';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';

const placesUsersRatingsRouter = Router();

const getPlaceUsersRatingController = new GetPlaceUsersRatingController();
const getPlaceUsersRatingCountController =
  new GetPlaceUsersRatingCountController();
const createPlacesUsersRatingsController =
  new CreatePlaceUserRatingsController();

placesUsersRatingsRouter.get(
  '/:place_uuid',
  ensureAuthenticatedClient,
  getPlaceUsersRatingController.handle,
);

placesUsersRatingsRouter.get(
  '/count/:place_uuid',
  ensureAuthenticatedClient,
  getPlaceUsersRatingCountController.handle,
);

placesUsersRatingsRouter.post(
  '/create',
  ensureAuthenticatedClient,
  createPlacesUsersRatingsController.handle,
);

export { placesUsersRatingsRouter };
