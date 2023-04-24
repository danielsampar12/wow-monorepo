import { Router } from 'express';
import { CreatePasswordRecoveryTokenController } from '../modules/passwordRecoveryTokens/controllers/CreatePasswordRecoveryTokenController';
import { VerifyPasswordRecoveryTokenController } from '../modules/passwordRecoveryTokens/controllers/VerifyPasswordRecoveryTokenController';

const passwordRecoveryTokenRouter = Router();

const createPasswordRecoveryTokenController = new CreatePasswordRecoveryTokenController();
const verifyPasswordRecoveryTokenController = new VerifyPasswordRecoveryTokenController();

passwordRecoveryTokenRouter.post('/request-token', createPasswordRecoveryTokenController.handle);
passwordRecoveryTokenRouter.post('/verify-token', verifyPasswordRecoveryTokenController.handle);

export { passwordRecoveryTokenRouter };
