import { Schema, Types, model } from 'mongoose';

export interface IMembership {
  customerId: Types.ObjectId;
  planId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

const MembershipSchema = new Schema<IMembership>({
  customerId: {
    type: Types.ObjectId,
    required: true,
  },
  planId: {
    type: Types.ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const Membership = model<IMembership>('membership', MembershipSchema, 'memberships');
