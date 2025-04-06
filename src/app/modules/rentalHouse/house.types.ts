import { Types } from "mongoose";


export type TRentalHouse = {
  _id?: string;
  location: string;
  description: string;
  rent_amount: string;
  number_of_bedrooms: string;
  multiple_images: string[];
  amenities: string[];
    landlord_ID?: Types.ObjectId ;
    isDeleted?: boolean;
};