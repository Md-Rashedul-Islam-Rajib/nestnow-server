import { model, Schema } from 'mongoose';
import { TRentalHouse } from './house.types';

const houseRentalSchema = new Schema<TRentalHouse>(
  {
    title: {
      type: String,
      required: true
    },
    rental_house_location: {
      type: String,
      required: true,
    },

    details_description: {
      type: String,
      required: true,
    },
    multiple_images: {
      type: [String],
      required: true,
    },
    number_of_bedrooms: {
      type: String,
      required: true,
    },
    rent_amount: {
      type: String,
      required: true,
    },

    landlord_ID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RentalHouseModel = model<TRentalHouse>('rentalHouse', houseRentalSchema);
