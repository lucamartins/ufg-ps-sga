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

interface ICustomer extends IUser {
  contracts: Types.ObjectId[];
}

interface IManager extends IUser {}

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

const CustomerSchema = new Schema<ICustomer>({
  contracts: {
    type: [Types.ObjectId],
    required: true,
  },
});

const ManagerSchema = new Schema<IManager>({});

const AdminSchema = new Schema<IAdmin>({});

export const User = model<IUser>('User', UserSchema);
export const Customer = User.discriminator<ICustomer>('Customer', CustomerSchema);
export const Manager = User.discriminator<IManager>('Manager', ManagerSchema);
export const Admin = User.discriminator<IAdmin>('Admin', AdminSchema);
