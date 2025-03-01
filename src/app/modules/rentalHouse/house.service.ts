import { RentalHouseModel } from "./house.model";
import { TRentalHouse } from "./house.types";

export class RentalHouseServices {
    static async createRentalHouse(payload: TRentalHouse) {
        const result = await RentalHouseModel.create(payload);
        return result;
    }

    static async getAllRentalHouses() {
        const result = await RentalHouseModel.find({ isDeleted: { $ne: true } });
        return result;
    }

    static async getSingleRentalHouse(id: string) {
        const result = await RentalHouseModel.findById({ _id: id });
        return result;
    }

    static async updateRentalHouse(id: string, payload: Partial<TRentalHouse>) {
        const result = await RentalHouseModel.findByIdAndUpdate(id, payload, {
          new: true,
          runValidators: true,
        });
        return result;
    }

    static async deleteRentalHouse(id: string) {
        const result = await RentalHouseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
    }
}