import { Router } from 'express';
import { GetLastMandatoryVersionController } from '../modules/versionUpdateControl/controllers/GetLastMandatoryVersionController';

const versionUpdateControlRouter = Router();

const getLastMandatoryVersionController = new GetLastMandatoryVersionController();

/**
 * * GET METHODS
 */
 versionUpdateControlRouter.get('/', getLastMandatoryVersionController.handle);

export { versionUpdateControlRouter };
