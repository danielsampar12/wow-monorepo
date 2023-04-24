import { Router } from "express";
import { GetTermsOfUseController } from "../modules/termsOfUse/controllers/GetTermsOfUseController";

const termsOfUseRouter = Router();

const getTermsOfUseController = new GetTermsOfUseController();

termsOfUseRouter.get('/', getTermsOfUseController.handle);

export { termsOfUseRouter };