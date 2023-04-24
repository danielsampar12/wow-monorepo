import { Router } from 'express';

/**
 * Controllers
 */
import { GetUserController } from '../modules/users/controllers/GetUserController';
import { CreateUserController } from '../modules/users/controllers/CreateUserController';
import { DeleteUserController } from '../modules/users/controllers/DeleteUserController';
import { UpdateUserController } from '../modules/users/controllers/UpdateUserController';
import { SetUserAgeGroupsController } from '../modules/users/controllers/SetUserAgeGroupsController';
import { SetUserCategoriesController } from '../modules/users/controllers/SetUserCategoriesController';
import { GetEventsFromUserWishListController } from '../modules/usersEventsWishlist/controllers/GetUserEventsWishlistController';
import { CreateUserEventWishlistController } from '../modules/usersEventsWishlist/controllers/CreateUserEventWishlistController';
import { InactivateUserEventFromWishListController } from '../modules/usersEventsWishlist/controllers/InactivateUserEventWishlist';
import { CreateUsersPlacesWishListController } from '../modules/usersPlacesWishList/controllers/CreateUsersPlaceWishListController';
import { GetPlacesFromUserWishListController } from '../modules/usersPlacesWishList/controllers/GetPlacesFromUserWishListController';
import { InactivateUserPlaceFromWishListController } from '../modules/usersPlacesWishList/controllers/InactivateUserPlaceFromWishListController';
import { CreateAppleUserController } from '../modules/users/controllers/CreateAppleUserController';
import { CreateGoogleUserController } from '../modules/users/controllers/CreateGoogleUserController';
import { CreateFacebookUserController } from '../modules/users/controllers/CreateFacebookUserController';
import { UpdateUserPasswordController } from '../modules/users/controllers/UpdateUserPasswordController';
import { ensureAuthenticatedClient } from '../middlewares/ensureAuthenticatedClient';

const usersRouter = Router();

const createUserEventWishlistController =
  new CreateUserEventWishlistController();

const getPlacesFromUserWishListController =
  new GetPlacesFromUserWishListController();

const getEventsFromUserWishListController =
  new GetEventsFromUserWishListController();

const createUsersPlacesWishListController =
  new CreateUsersPlacesWishListController();

const inactivateUserPlaceFromWishListController =
  new InactivateUserPlaceFromWishListController();

const inactivateUserEventFromWishListController =
  new InactivateUserEventFromWishListController();

const getUserController = new GetUserController();

const createUserController = new CreateUserController();
const createAppleUserController = new CreateAppleUserController();
const createGoogleUserController = new CreateGoogleUserController();
const createFacebookUserController = new CreateFacebookUserController();

const deleteUserController = new DeleteUserController();

const updateUserController = new UpdateUserController();

const setUserAgeGroupsController = new SetUserAgeGroupsController();

const setUserCategoriesController = new SetUserCategoriesController();

const updateUserPasswordController = new UpdateUserPasswordController();

/**
 * GET
 */
usersRouter.get(
  '/wishListPlaces/:uuid',
  ensureAuthenticatedClient,
  getPlacesFromUserWishListController.handle,
);
usersRouter.get(
  '/wishListEvents/:uuid',
  ensureAuthenticatedClient,
  getEventsFromUserWishListController.handle,
);
usersRouter.get('/:uuid', getUserController.handle);

/**
 * POST
 */
usersRouter.post('/create', createUserController.handle);
usersRouter.post('/create-apple', createAppleUserController.handle);
usersRouter.post('/create-google', createGoogleUserController.handle);
usersRouter.post('/create-facebook', createFacebookUserController.handle);
usersRouter.post('/setAgeGroups', ensureAuthenticatedClient, setUserAgeGroupsController.handle);
usersRouter.post('/setCategories', ensureAuthenticatedClient, setUserCategoriesController.handle);
usersRouter.post('/createWishPlace', ensureAuthenticatedClient, createUsersPlacesWishListController.handle);
usersRouter.post('/createWishEvent', ensureAuthenticatedClient, createUserEventWishlistController.handle);

/**
 * PUT
 */
usersRouter.put(
  '/inactivateWishEvent',
  ensureAuthenticatedClient,
  inactivateUserEventFromWishListController.handle,
);
usersRouter.put(
  '/inactivateWishPlace',
  ensureAuthenticatedClient,
  inactivateUserPlaceFromWishListController.handle,
);
usersRouter.put('/update/:uuid', ensureAuthenticatedClient, updateUserController.handle);
usersRouter.put('/change-password', updateUserPasswordController.handle);

/**
 * DELETE
 */
usersRouter.delete('/delete/:uuid', ensureAuthenticatedClient, deleteUserController.handle);

export { usersRouter };
