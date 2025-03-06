import { Types } from "mongoose";

export type TRentalRequest = {
    _id?: string;
    rental_house: Types.ObjectId;
    tenant_id: Types.ObjectId  ;
    status: 'pending' | 'approved' | 'rejected';
    landlord_phone?: string;
    payment_status?: 'pending' | 'paid' | 'failed';
    additional_info?: string;
    isDeleted?: boolean;
}