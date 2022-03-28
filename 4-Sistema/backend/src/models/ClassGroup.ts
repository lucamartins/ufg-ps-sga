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
  maxAge: number;
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
  maxCapacity: {
    required: true,
    type: Number,
  },
  minAge: {
    required: true,
    type: Number,
  },
  maxAge: {
    required: true,
    type: Number,
  },
});

export const ClassGroup = model<IClassGroup>('class_group', ClassGroupSchema, 'class_groups');
