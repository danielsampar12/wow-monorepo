import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreatePlaceSuggetionsController } from '../modules/placeSuggetions/controllers/CreatePlaceSuggetionController';

const placeSuggestionRouter = Router();

const createPlaceSuggetionsController = new CreatePlaceSuggetionsController();

/**
 * POST
 */
placeSuggestionRouter.post('/create', ensureAuthenticatedClient, createPlaceSuggetionsController.handle);

export { placeSuggestionRouter };
