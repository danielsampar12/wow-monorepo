import { Router } from 'express';
import { GetEventUsersRatingController } from '../modules/eventUserRatings/controllers/GetEventUsersRatingController';
import { CreateEventUserRatingsController } from '../modules/eventUserRatings/controllers/CreateEventUserRatingsController';
import { GetEventUsersRatingCountController } from '../modules/eventUserRatings/controllers/GetEventUsersRatingCountController';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';

const eventsUsersRatingsRouter = Router();

const getEventUsersRatingController = new GetEventUsersRatingController();
const getEventUsersRatingCountController =
  new GetEventUsersRatingCountController();
const createEventUserRatingsController =
  new CreateEventUserRatingsController();

eventsUsersRatingsRouter.get(
  '/:event_uuid',
  ensureAuthenticatedClient,
  getEventUsersRatingController.handle,
);

eventsUsersRatingsRouter.get(
  '/count/:event_uuid',
  ensureAuthenticatedClient,
  getEventUsersRatingCountController.handle,
);

eventsUsersRatingsRouter.post(
  '/create',
  ensureAuthenticatedClient,
  createEventUserRatingsController.handle,
);

export { eventsUsersRatingsRouter };
