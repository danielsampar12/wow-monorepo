import { Router } from "express";
import { GetPrivacyPolicyController } from "../modules/privacyPolicy/controllers/GetPrivacyPolicyController";

const privacyPolicyRouter = Router();

const getPrivacyPolicyController = new GetPrivacyPolicyController();

privacyPolicyRouter.get('/', getPrivacyPolicyController.handle);

export { privacyPolicyRouter };