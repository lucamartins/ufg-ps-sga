import { Schema, model, Types } from 'mongoose';

//
// interfaces
//

interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  __t: string;
}

interface ICustomer extends IUser {}

interface IAdmin extends IUser {}

//
// implementation
//

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
});

const CustomerSchema = new Schema<ICustomer>({});
const AdminSchema = new Schema<IAdmin>({});

export const User = model<IUser>('User', UserSchema);
export const Customer = User.discriminator<ICustomer>('Customer', CustomerSchema);
export const Admin = User.discriminator<IAdmin>('Admin', AdminSchema);
