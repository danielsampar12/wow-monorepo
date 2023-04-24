import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateAuthorController } from '../modules/authors/controllers/CreateAuthorController';
import { GetAuthorsController } from '../modules/authors/controllers/GetAuthorsController';

const authorsRouter = Router();

const createAuthorController = new CreateAuthorController();
const getAuthorsController = new GetAuthorsController();

authorsRouter.post(
  '/create',
  ensureAuthenticatedClient,
  createAuthorController.handle,
);
authorsRouter.get('/', ensureAuthenticatedClient, getAuthorsController.handle);

export { authorsRouter };
