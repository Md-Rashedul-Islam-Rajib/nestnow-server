import { EmailHelper } from "../../utilities/emailHelper";
import { RentalHouseModel } from "../rentalHouse/house.model";
import { UserModel } from "../user/user.model";
import { RentalRequestModel } from "./request.model";
import { TRentalRequest } from "./request.types";

export class RentalRequestServices {
  static async createRentalRequest(payload: TRentalRequest) {
    const result = await RentalRequestModel.create(payload);

    // Fetch house details including landlord
    const rentalHouse = await RentalHouseModel.findById(
      payload.rental_house,
    ).populate('landlord_ID');

    if (!rentalHouse || !rentalHouse.landlord_ID) {
      throw new Error('Rental house not found');
    }

    const landlord = await UserModel.findById(rentalHouse.landlord_ID._id);
    if (!landlord) {
      throw new Error('Landlord not found');
    }
    // Fetch tenant details
    const tenant = await UserModel.findById(payload.tenant_id);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    // Notify landlord via email
    await EmailHelper.sendEmail(
      landlord?.email,
      'New Rental Request Received',
      {
        landlordName: landlord?.name,
        tenantName: tenant.name,
        tenantEmail: tenant.email,
        propertyTitle: rentalHouse.title,
        rentalRequestLink: `https://example.com/rental-request/${result._id}`,
      },
      'new_rental_request_landlord',
    );

    return result;
  }

  //   static async createRentalRequest(payload: TRentalRequest) {
  //     const result = await RentalRequestModel.create(payload);

  //     // Fetch landlord details
  //     const property = await PropertyModel.findById(payload.property).populate(
  //       'landlord tenant',
  //     );

  //     if (!property || !property.landlord) {
  //       throw new Error('Property or landlord not found');
  //     }

  //     // Notify landlord via email
  //     await EmailHelper.sendEmail(
  //       property.landlord.email,
  //       await EmailHelper.createEmailContent(
  //         {
  //           landlordName: property.landlord.name,
  //           tenantName: property.tenant.name,
  //           tenantEmail: property.tenant.email,
  //           propertyTitle: property.title,
  //           rentalRequestLink: `https://example.com/rental-request/${result._id}`,
  //         },
  //         'new_rental_request_landlord', // Corresponding template name
  //       ),
  //       'New Rental Request Received',
  //     );

  //     return result;
  //   }

  static async getAllRentalRequests() {
    const result = await RentalRequestModel.find({ isDeleted: { $ne: true } });
    return result;
  }
  static async getSingleRentalRequest(id: string) {
    const result = await RentalRequestModel.findById({ _id: id });
    return result;
  }

  static async updateRentalRequest(
    id: string,
    payload: Partial<TRentalRequest>,
  ) {
    const result = await RentalRequestModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  }

  static async updateRequestStatus(id: string) {
    const result = await RentalRequestModel.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true, runValidators: true },
    );
    return result;
  }

  // static async updateRequestStatus(id: string) {
  //   const result = await RentalRequestModel.findByIdAndUpdate(
  //     id,
  //     { status: 'approved' },
  //     { new: true, runValidators: true },
  //   ).populate('tenant_id rental_house'); // Populate required details

  //   if (!result || !result.tenant_id) {
  //     throw new Error('Rental request or tenant not found');
  //   }

  //   // Notify tenant via email
  //   await EmailHelper.sendEmail(
  //     result.tenant_id.email,
  //     'Your Rental Request Status Has Been Updated',
  //     {
  //       userName: result.tenant_id.name,
  //       propertyTitle: result.rental_house?.title || 'the property',
  //       requestStatus: result.status,
  //     },
  //     'rental_request_update_tenant', // Corresponding template
  //   );

  //   return result;
  // }

  static async deleteRentalRequest(id: string) {
    const result = await RentalRequestModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, runValidators: true },
    );
    return result;
  }
}