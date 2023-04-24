import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { GetAgeGroupsController } from '../modules/ageGroups/controllers/GetAgeGroupsController';

const ageGroupsRouter = Router();

const getAgeGroupsController = new GetAgeGroupsController();

ageGroupsRouter.get('/', ensureAuthenticatedClient, getAgeGroupsController.handle);

export { ageGroupsRouter };
