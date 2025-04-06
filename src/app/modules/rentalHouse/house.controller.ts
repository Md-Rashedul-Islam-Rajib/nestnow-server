import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { RentalHouseServices } from "./house.service";

export class RentalHouseController {
  static createRentalHouse = catchAsync(async (req, res) => {
     if (req.body.amenities && typeof req.body.amenities === 'string') {
       try {
         req.body.amenities = JSON.parse(req.body.amenities);
       } catch (error) {
         return res.status(400).json({
           success: false,
           message: 'Invalid amenities format. Must be a JSON array.',
         });
       }
     }
     const data = await RentalHouseServices.createRentalHouse(
       req.body,
       req.files as Express.Multer.File[],
    );
    console.log("controller", data);
    sendResponse(res, 201, true, 'Rental house created successfully', data);
  });

  static getAllRentalHouses = catchAsync(async (req, res) => {
    const query = req.query; // Extract query parameters from request
    const data = await RentalHouseServices.getAllRentalHouses(query);

    sendResponse(res, 200, true, 'Rental houses fetched successfully', data);
  });

  static getSingleRentalHouse = catchAsync(async (req, res) => {
    const data = await RentalHouseServices.getSingleRentalHouse(req.params.id);
    sendResponse(res, 200, true, 'Rental house fetched successfully', data);
  });

  static updateRentalHouse = catchAsync(async (req, res) => {
    const data = await RentalHouseServices.updateRentalHouse(
      req.params.id,
      req.body,
    );
    sendResponse(res, 200, true, 'Rental house updated successfully', data);
  });

  static deleteRentalHouse = catchAsync(async (req, res) => {
    const data = await RentalHouseServices.deleteRentalHouse(req.params.id);
    sendResponse(res, 200, true, 'Rental house deleted successfully', data);
  });
}