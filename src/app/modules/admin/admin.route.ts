import { Router } from "express";
import { AuthControllers } from "../auth/auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { RentalHouseController } from "../rentalHouse/house.controller";

const AdminRouter: Router = Router();

AdminRouter.get('/users', auth(USER_ROLE.admin), AuthControllers.getUsers);
AdminRouter.put(
  '/users/:id',
  auth(USER_ROLE.admin),
  AuthControllers.updateUser,
);
AdminRouter.delete(
  '/users/:id',
  auth(USER_ROLE.admin),
  AuthControllers.deleteUser
);
AdminRouter.get(
  '/listings',
  auth(USER_ROLE.admin),
  RentalHouseController.getAllRentalHouses,
);
AdminRouter.delete(
  '/listings/:id',
  auth(USER_ROLE.admin),
  RentalHouseController.updateRentalHouse,
);
AdminRouter.delete(
  '/listings/:id',
  auth(USER_ROLE.admin),
  RentalHouseController.deleteRentalHouse,
);
export default AdminRouter;