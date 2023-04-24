import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { GetActiveAnnouncementsController } from '../modules/announcements/controllers/getActiveAnnouncements/GetActiveAnnouncementsController';

const announcementsRouter = Router();

const getActiveAnnouncementsController = new GetActiveAnnouncementsController();

announcementsRouter.get('/', ensureAuthenticatedClient, getActiveAnnouncementsController.handle);

export { announcementsRouter };
