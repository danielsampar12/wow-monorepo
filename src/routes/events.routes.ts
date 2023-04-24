import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateEventController } from '../modules/events/controllers/CreateEventController';
import { GetEventsByCategoryController } from '../modules/events/controllers/GetEventsByCategoryController';
import { GetEventsByMonthController } from '../modules/events/controllers/GetEventsByMonthController';
import { GetUpNextEventsController } from '../modules/events/controllers/GetUpNextEventsController';

const eventsRouter = Router();

const createEventController = new CreateEventController();
const getUpNextEventsController = new GetUpNextEventsController();
const getEventsByMonthController = new GetEventsByMonthController();
const getEventsByCategoryController = new GetEventsByCategoryController();

eventsRouter.get('/getUpNext/:date', ensureAuthenticatedClient, getUpNextEventsController.handle);
eventsRouter.get('/getByMonth/:date', ensureAuthenticatedClient, getEventsByMonthController.handle);
eventsRouter.get(
  '/getByCategory/:categoryUuid',
  ensureAuthenticatedClient,
  getEventsByCategoryController.handle,
);

eventsRouter.post('/create', createEventController.handle);

export { eventsRouter };
