import { Router } from "express";
import { ensureAuthenticatedClient } from "../middlewares/ensureAuthenticatedClient";
import { SearchController } from "../modules/search/controllers/SearchController";

const searchRouter = Router();

const searchController = new SearchController();

searchRouter.post('/', ensureAuthenticatedClient, searchController.handle);

export { searchRouter };