import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: number | string;
  role: 'admin' | 'landlord' | 'tenant';
  isBlocked?: boolean;
  isDeleted?: boolean;
};

export interface UserStatics extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(email: string, id?: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
