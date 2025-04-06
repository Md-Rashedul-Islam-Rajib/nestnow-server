import { Router } from "express";
import { RentalHouseController } from "./house.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { RentalRequestController } from "../rentalRequest/request.controller";
import { upload } from "../../config/cloudinary";

const RentalHouseRouter: Router = Router();

RentalHouseRouter.post(
  '/listings',
  auth(USER_ROLE.landlord),
  upload.array('images', 10),
  RentalHouseController.createRentalHouse,
);
RentalHouseRouter.get(
  '/listings/',
  auth(USER_ROLE.landlord),
  RentalHouseController.getAllRentalHouses,
);
RentalHouseRouter.get(
  '/listings/:id',
  auth(USER_ROLE.landlord),
  RentalHouseController.getSingleRentalHouse,
);
RentalHouseRouter.put(
  '/listings/:id',
  auth(USER_ROLE.landlord),
  RentalHouseController.updateRentalHouse,
);
RentalHouseRouter.delete(
  '/listings/:id',
  auth(USER_ROLE.landlord),
  RentalHouseController.deleteRentalHouse,
);
RentalHouseRouter.get(
  '/requests',
  auth(USER_ROLE.landlord),
  RentalRequestController.getAllRentalRequests,
);
RentalHouseRouter.delete(
  '/requests/:id',
  auth(USER_ROLE.landlord),
  RentalRequestController.updateRentalRequest,
);
export default RentalHouseRouter;