import { Router } from 'express';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';
import { CreateChildController } from '../modules/children/controllers/CreateChildController';
import { DeleteChildController } from '../modules/children/controllers/DeleteChildController';
import { UpdateChildController } from '../modules/children/controllers/UpdateChildController';

const childrenRouter = Router();

const createChildController = new CreateChildController();
const deleteChildController = new DeleteChildController();
const updateChildController = new UpdateChildController();

childrenRouter.post('/create', ensureAuthenticatedClient, createChildController.handle);
childrenRouter.delete('/delete', ensureAuthenticatedClient, deleteChildController.handle);
childrenRouter.put('/update/:child_uuid', ensureAuthenticatedClient, updateChildController.handle);

export { childrenRouter };
