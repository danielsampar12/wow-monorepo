import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateEventsSchedulesController } from '../modules/eventSchedules/controllers/CreateEventManySchedulesController';
import { DeleteEventScheduleController } from '../modules/eventSchedules/controllers/DeleteEventScheduleController';
import { GetEventSchedulesByEventController } from '../modules/eventSchedules/controllers/GetEventSchedulesByEventController';
import { GetEventsSchedulesController } from '../modules/eventSchedules/controllers/GetEventsSchedulesController';

const eventsSchedulesRouter = Router();

const getEventsSchedulesController = new GetEventsSchedulesController();
const getEventSchedulesByEventController =
  new GetEventSchedulesByEventController();

const createEventsSchedulesController = new CreateEventsSchedulesController();

const deleteEventsSchedulesController = new DeleteEventScheduleController();

/**
 * * GET
 */
eventsSchedulesRouter.get('/', ensureAuthenticatedClient, getEventsSchedulesController.handle);
eventsSchedulesRouter.get(
  '/getByEvent/:eventUuid/:date',
  ensureAuthenticatedClient,
  getEventSchedulesByEventController.handle,
);

/**
 * ? POST
 */
eventsSchedulesRouter.post(
  '/createMany',
  ensureAuthenticatedClient,
  createEventsSchedulesController.handle,
);

/**
 * ! DELETE
 */
eventsSchedulesRouter.delete(
  '/delete/:uuid',
  ensureAuthenticatedClient,
  deleteEventsSchedulesController.handle,
);

export { eventsSchedulesRouter };
