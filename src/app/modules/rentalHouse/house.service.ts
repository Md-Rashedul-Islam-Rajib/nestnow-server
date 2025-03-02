import QueryBuilder from "../../builder/queryBuilder";
import { RentalHouseModel } from "./house.model";
import { TRentalHouse } from "./house.types";

export class RentalHouseServices {
  static async createRentalHouse(payload: TRentalHouse) {
    const result = await RentalHouseModel.create(payload);
    return result;
  }

  static async getAllRentalHouses(query: Record<string, unknown>) {
    const modelQuery = RentalHouseModel.find({ isDeleted: { $ne: true } });

    const queryBuilder = new QueryBuilder(modelQuery, query)
      .search(['title', 'description', 'location', 'rent_amount','number_of_bedrooms'])
      .filter()
      .priceRange()
      .filterByBedrooms()
      .filterByLocation()
      .sort()
      .paginate()
      .fields();

    const result = await queryBuilder.modelQuery;
    const totalCount = await queryBuilder.countTotal();

    return { data: result, pagination: totalCount };
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
    const result = await RentalHouseModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, runValidators: true },
    );
    return result;
  }
}