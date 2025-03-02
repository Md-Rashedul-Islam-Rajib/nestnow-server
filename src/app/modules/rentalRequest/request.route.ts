import { Router } from "express";
import { RentalRequestController } from "./request.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { AuthControllers } from "../auth/auth.controller";

const RentalRequestRouter: Router = Router();

RentalRequestRouter.post(
  '/requests',
  auth(USER_ROLE.tenant),
  RentalRequestController.createRentalRequest,
);
RentalRequestRouter.get(
  '/requests',
  auth(USER_ROLE.tenant),
  RentalRequestController.getAllRentalRequests,
);
RentalRequestRouter.put(
  '/profile',
  auth(USER_ROLE.tenant),
  AuthControllers.updateUser,
);
export default RentalRequestRouter;