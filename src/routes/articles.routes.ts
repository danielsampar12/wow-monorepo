import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateArticleController } from '../modules/articles/controllers/CreateArticleController';
import { GetArticleController } from '../modules/articles/controllers/GetArticleController';

const articlesRouter = Router();

const createArticleController = new CreateArticleController();
const getArticleController = new GetArticleController();

articlesRouter.post(
  '/create',
  ensureAuthenticatedClient,
  createArticleController.handle,
);
articlesRouter.get('/:uuid', ensureAuthenticatedClient, getArticleController.handle);

export { articlesRouter };
