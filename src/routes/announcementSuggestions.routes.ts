import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateAnnouncementSuggestionsController } from '../modules/announcementSuggestions/controllers/CreateAnnouncementSuggestionsController';

const announcementSuggestionsRouter = Router();

const createAnnouncementSuggestionsController =
  new CreateAnnouncementSuggestionsController();

announcementSuggestionsRouter.post(
  '/create',
  ensureAuthenticatedClient,
  createAnnouncementSuggestionsController.handle,
);

export { announcementSuggestionsRouter };
