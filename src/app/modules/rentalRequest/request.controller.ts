import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { RentalRequestServices } from "./request.service";

export class RentalRequestController {
    static createRentalRequest = catchAsync(async (req, res) => {
        const data = await RentalRequestServices.createRentalRequest(req.body);
        sendResponse(res, 200, true, "Rental Request created successfully", data);
    });

    static getAllRentalRequests = catchAsync(async (req, res) => {
        const data = await RentalRequestServices.getAllRentalRequests();
        sendResponse(
          res,
          200,
          true,
          'Rental requests fetched successfully',
          data,
        );
    });

    static getSingleRentalRequest = catchAsync(async (req, res) => {
        const data = await RentalRequestServices.getSingleRentalRequest(req.params.id);
        sendResponse(res, 200, true, "Rental request fetched successfully", data);
    });

    static updateRentalRequest = catchAsync(async (req, res) => {
        const data = await RentalRequestServices.updateRentalRequest(req.params.id, req.body);
        sendResponse(res, 200, true, "Rental request updated successfully", data);
    });

    static updateRequestStatus = catchAsync(async (req, res) => {
        const data = await RentalRequestServices.updateRequestStatus(req.params.id);
        sendResponse(res, 200, true, "Rental Request status updated successfully", data);
    });

    static deleteRentalRequest = catchAsync(async (req, res) => {
        const data = await RentalRequestServices.deleteRentalRequest(req.params.id);
        sendResponse(res, 200, true, "Rental request deleted successfully", data);
    });
}