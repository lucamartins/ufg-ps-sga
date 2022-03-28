import { Schema, model, Types } from 'mongoose';

interface IContract {
  customer: Types.ObjectId;
  plan: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  description?: string;
  isActive: () => boolean;
}

const ContractSchema = new Schema<IContract>({
  customer: {
    type: Types.ObjectId,
    required: true,
  },
  plan: {
    type: Types.ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

ContractSchema.methods.isActive = function (): boolean {
  return this.endDate.getTime() < Date.now;
};

export const Contract = model<IContract>('Contract', ContractSchema);
