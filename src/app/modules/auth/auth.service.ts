import { StatusFullError } from '../../class/statusFullError';
import { UserModel } from '../user/user.model';
import { TUser } from '../user/user.types';
import { TLoginUser } from './auth.types';
import { createToken, preValidatingUser } from './auth.utilities';
import config from '../../config';
import bcrypt from 'bcrypt';
import QueryBuilder from '../../builder/queryBuilder';


export class AuthServices {
  static async registerUser(payload: TUser) {
    const userExists = await UserModel.isUserExists(payload.email);
    if (userExists) {
      throw new Error('this user already registered');
    }
    const data = await UserModel.create(payload);
    const { _id, name, email } = data;
    const result = { _id, name, email };
    return result;
  }

  static async loginUser(payload: TLoginUser) {
    const user = await preValidatingUser(payload.email);

    const isPasswordCorrect = await UserModel.isPasswordMatched(
      payload?.password,
      user?.password,
    );

    if (!isPasswordCorrect) {
      throw new StatusFullError(
        'AuthenticationError',
        'Password is incorrect',
        true,
        401,
      );
    }
console.log({
  email: user.email,
  role: user.role,
});
    const jwtPayload = {
      email: user.email,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret,
      config.jwt_access_expires_in,
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret,
      config.jwt_refresh_expires_in,
    );

    return {
      accessToken,
      refreshToken,
      email: user.email,
      role: user.role,
    };
  }
  static async getAllUsers(query: Record<string, unknown>) {
    const userQuery = UserModel.find({ isDeleted: { $ne: true } });
    const queryBuilder = new QueryBuilder(userQuery, query);

    const result = await queryBuilder.modelQuery;

    return result;
  }

  

  static async updateUser(updatedData: Partial<TUser>) {
    const response = await UserModel.findOneAndUpdate(
      {
        email: updatedData?.email,
      },
      updatedData,
      { new: true },
    );
    return response;
  }

  static async getSingleUser(id: string) {
    const response = await UserModel.findById({
      _id: id,
    });
    return response;
  }

  static async toggleUserBlock(id: string, isBlocked: boolean) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Toggle block status
    user.isBlocked = isBlocked;
    await user.save();

    return {
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
    };
  }
    static async deleteUser(id: string) {
      const result = await UserModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, runValidators: true },
      );
      return result;
    }

  static async changePassword(updatedData: {
    email: string;
    currentPassword: string;
    newPassword: string;
  }) {
    const { email, currentPassword, newPassword } = updatedData;
    const user = await UserModel.isUserExists(email);
    const passwordMatched = UserModel.isPasswordMatched(
      currentPassword,
      user.password,
    );
    if (!passwordMatched) {
      throw new Error('Current password is incorrect');
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds),
    );

    await UserModel.findOneAndUpdate(
      { email },
      { password: newHashedPassword },
    );
    return { message: 'Password updated successfully' };
  }
}
