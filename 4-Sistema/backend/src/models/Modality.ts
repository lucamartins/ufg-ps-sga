import { Schema, model } from 'mongoose';
const Types = Schema.Types;

interface IModality {
  name: string;
  active: boolean;
}

const ModalitySchema = new Schema<IModality>({
  name: {
    type: Types.String,
    required: true,
  },
  active: {
    type: Types.Boolean,
    required: true,
  },
});

export const Modality = model<IModality>('Modality', ModalitySchema, 'modalities');
