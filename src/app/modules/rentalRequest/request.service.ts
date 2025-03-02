import { RentalRequestModel } from "./request.model";
import { TRentalRequest } from "./request.types";

export class RentalRequestServices {
    static async createRentalRequest(payload: TRentalRequest) {
        const result = await RentalRequestModel.create(payload);
        return result;
    }

    static async getAllRentalRequests() {
        const result = await RentalRequestModel.find({ isDeleted: { $ne: true } });
        return result;
    }
    static async getSingleRentalRequest(id: string) {
        const result = await RentalRequestModel.findById({ _id: id });
        return result;
    }

    static async updateRentalRequest(id: string, payload: Partial<TRentalRequest>) {
        const result = await RentalRequestModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        return result;
    };

    static async updateRequestStatus(id: string) {
        const result = await RentalRequestModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true, runValidators: true });
        return result;
    }

    static async deleteRentalRequest(id: string) {
        const result = await RentalRequestModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
        return result;
    }
}