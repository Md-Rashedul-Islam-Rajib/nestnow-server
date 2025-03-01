import { Router } from "express";
import { RentalHouseController } from "./house.controller";

const RentalHouseRouter: Router = Router();

RentalHouseRouter.post('/create', RentalHouseController.createRentalHouse);
RentalHouseRouter.get('/', RentalHouseController.getAllRentalHouses);
RentalHouseRouter.get('/:id', RentalHouseController.getSingleRentalHouse);
RentalHouseRouter.put('/:id', RentalHouseController.updateRentalHouse);
RentalHouseRouter.delete('/:id', RentalHouseController.deleteRentalHouse);