import { Schema, model, Types } from 'mongoose';

enum WeekDays {
  monday = 'MONDAY',
  tuesday = 'TUESDAY',
  wednesday = 'WEDNESDAY',
  thursday = 'THURSDAY',
  friday = 'FRIDAY',
}

interface IClassGroup {
  weekDays: WeekDays[];
  schedule: string;
  customers: Types.ObjectId[];
  maxCapacity: number;
  minAge: number;
  maxAge?: number;
  modalityId: Types.ObjectId;
}

const ClassGroupSchema = new Schema<IClassGroup>({
  weekDays: {
    required: true,
    type: [String],
  },
  schedule: {
    required: true,
    type: String,
  },
  customers: {
    required: true,
    type: [Types.ObjectId],
  },
  modalityId: {
    required: true,
    type: Types.ObjectId,
  },
  maxCapacity: {
    required: true,
    type: Number,
  },
  minAge: {
    required: false,
    type: Number,
  },
  maxAge: {
    required: false,
    type: Number,
  },
});

export const ClassGroup = model<IClassGroup>('class_group', ClassGroupSchema, 'class_groups');
