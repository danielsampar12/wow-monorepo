import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateCategoryController } from '../modules/categories/controllers/CreateCategoryController';
import { DeleteCategoryController } from '../modules/categories/controllers/DeleteCategoryController';
import { GetCategoriesController } from '../modules/categories/controllers/GetCategoriesController';

const categoriesRouter = Router();

const getCategoriesController = new GetCategoriesController();
const createCategoryController = new CreateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRouter.get(
  '/',
  ensureAuthenticatedClient,
  getCategoriesController.handle,
);
categoriesRouter.post('/create', ensureAuthenticatedClient, createCategoryController.handle);
categoriesRouter.delete('/delete/:uuid', ensureAuthenticatedClient, deleteCategoryController.handle);

export { categoriesRouter };
