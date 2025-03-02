import { Router } from "express";
import { RentalRequestController } from "./request.controller";

const RentalRequestRouter: Router = Router();

RentalRequestRouter.post('/requests/create', RentalRequestController.createRentalRequest);
RentalRequestRouter.get('/requests/create', RentalRequestController.getAllRentalRequests);

export default RentalRequestRouter;