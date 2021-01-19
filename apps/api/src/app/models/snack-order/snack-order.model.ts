import { model, Schema } from 'mongoose';
import { ISnackOrderModel } from '@csl/shared';

const SnackOrderSchema = new Schema(
  {
    id: { type: String, required: true },
    cart: { type: Array, required: true },
    date: { type: String, required: true },
    total: { type: Number, required: true },
    confirmed: { type: Boolean, required: true, default: false },
    name: { type: String, required: true },
    classID: { type: String, required: true },
  },
  { versionKey: false }
);

export const SnackOrder = model<ISnackOrderModel>(
  'snack-order',
  SnackOrderSchema,
  'snack-orders'
);
