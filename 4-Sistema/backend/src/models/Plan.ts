import { Schema, model, Types } from 'mongoose';

interface IPlan {
  name: string;
  modality: Types.ObjectId;
  numberLessonsWeek: number;
  priceEachMonth: number;
  numberMonths: number;
}

const PlanSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: true,
  },
  modality: {
    type: Types.ObjectId,
    required: true,
  },
  numberLessonsWeek: {
    type: Number,
    required: true,
  },
  numberMonths: {
    type: Number,
    required: true,
  },
  priceEachMonth: {
    type: Number,
    required: true,
  },
});

export const Plan = model<IPlan>('Plan', PlanSchema);
