import { model, Schema } from 'mongoose';
import { TRentalRequest } from './request.types';


const rentalRequestSchema = new Schema<TRentalRequest>(
  {
    rental_house: {
      type: Schema.Types.ObjectId,
      ref: 'rentalHouse',
    },

    additional_info: {
      type: String,
      required: false,
    },
    landlord_phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
        enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    payment_status: {
      type: String,
        enum: ['pending', 'paid', 'failed'],
      required: false,
    },

    tenant_id: {
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

export const RentalRequestModel = model<TRentalRequest>('rentalRequest', rentalRequestSchema);
