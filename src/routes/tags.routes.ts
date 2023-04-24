import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateTagController } from '../modules/tags/controllers/CreateTagController';
import { GetTagsController } from '../modules/tags/controllers/GetTagsController';
import { GetTagsWithPlacesController } from '../modules/tags/controllers/GetTagsWithPlacesController';

const tagsRouter = Router();

const getTagsController = new GetTagsController();
const createTagController = new CreateTagController();
const getTagsWithPlacesController = new GetTagsWithPlacesController();

/**
 * * GET METHODS
 */
tagsRouter.get('/', ensureAuthenticatedClient, getTagsController.handle);
tagsRouter.get('/withItems', ensureAuthenticatedClient, getTagsWithPlacesController.handle);

/**
 * ! POST METHODS
 */
tagsRouter.post('/create', ensureAuthenticatedClient, createTagController.handle);

export { tagsRouter };
