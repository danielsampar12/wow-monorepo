import { Router } from 'express';
import { AuthenticateUserController } from '../modules/auth/controllers/AuthenticateUserController';
import { AuthenticateGoogleUserController } from '../modules/auth/controllers/AuthenticateGoogleUserController';
import { AuthenticateFacebookUserController } from '../modules/auth/controllers/AuthenticateFacebookUserController';
import { AuthenticateAppleUserController } from '../modules/auth/controllers/AuthenticateAppleUserController';

const authRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const authenticateAppleController = new AuthenticateAppleUserController();
const authenticateGoogleUserController = new AuthenticateGoogleUserController();
const authenticateFacebookUserController =
  new AuthenticateFacebookUserController();

authRouter.post('/', authenticateUserController.handle);
authRouter.post('/apple', authenticateAppleController.handle);
authRouter.post('/google', authenticateGoogleUserController.handle);
authRouter.post('/facebook', authenticateFacebookUserController.handle);

export { authRouter };
