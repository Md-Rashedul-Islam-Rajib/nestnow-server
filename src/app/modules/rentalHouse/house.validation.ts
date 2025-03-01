import { Types } from 'mongoose';
import { z } from 'zod';

export const rentalHouseCreationSchema = z.object({
  _id: z.string().optional(),
  rental_house_location: z.string().min(1, 'Location is required'),
  details_description: z.string().min(1, 'Description is required'),
  rent_amount: z.string().min(1, 'Rent amount is required'),
  number_of_bedrooms: z.string().min(1, 'Number of bedrooms is required'),
  multiple_images: z
    .array(z.string())
    .nonempty('At least one image is required'),
  landlord_ID: z.custom<Types.ObjectId>(),
  isDeleted: z.boolean().default(false),
});

export const updateRentalHouseSchema = z.object({
  _id: z.string().optional(), // _id is optional for updates
  rental_house_location: z.string().optional(),
  details_description: z.string().optional(),
  rent_amount: z.string().optional(),
  number_of_bedrooms: z.string().optional(),
  multiple_images: z.array(z.string()).optional(),
  landlord_ID: z.custom<Types.ObjectId>().optional(), // Optional for updates
  isDeleted: z.boolean().optional(),
});