import { model, Schema } from 'mongoose';
import { ISnackModel } from '@csl/shared';

const SnackSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maxQuantity: { type: Number, required: true },
  },
  { versionKey: false }
);

export const Snack = model<ISnackModel>('snack', SnackSchema);
