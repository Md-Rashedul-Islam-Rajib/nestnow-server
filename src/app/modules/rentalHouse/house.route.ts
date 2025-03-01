import { Router } from "express";
import { RentalHouseController } from "./house.controller";

const RentalHouseRouter: Router = Router();

RentalHouseRouter.post('/listings/create', RentalHouseController.createRentalHouse);
RentalHouseRouter.get('/listings/', RentalHouseController.getAllRentalHouses);
RentalHouseRouter.get('/listings/:id', RentalHouseController.getSingleRentalHouse);
RentalHouseRouter.put('/listings/:id', RentalHouseController.updateRentalHouse);
RentalHouseRouter.delete('/listings/:id', RentalHouseController.deleteRentalHouse);

export default RentalHouseRouter;