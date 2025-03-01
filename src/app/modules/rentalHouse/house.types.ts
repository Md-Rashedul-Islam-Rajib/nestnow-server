import { Types } from "mongoose";

export type TRentalHouse = {
  _id?: string;
  rental_house_location: string;
  details_description: string;
  rent_amount: string;
  number_of_bedrooms: string;
  multiple_images: string[];
    landlord_ID: Types.ObjectId;
    isDeleted: boolean;
};