import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateOwnerController } from '../modules/owners/controllers/CreateOwnerController';

const ownerRouter = Router();

const createOwnerController = new CreateOwnerController();

ownerRouter.post('/create', ensureAuthenticatedClient, createOwnerController.handle);

export { ownerRouter };
