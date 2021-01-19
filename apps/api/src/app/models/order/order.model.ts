import { model, Schema } from 'mongoose';
import { IOrderModel } from '@csl/shared';

const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    gadgets: { type: Array, required: true, default: [] },
    photos: { type: Array, required: true, default: [] },
    gadgetTotal: { type: Number, required: true, default: 0 },
    photoTotal: { type: Number, required: true, default: 0 },
    gadgetsConfirmed: { type: Boolean, required: true, default: false },
    photosConfirmed: { type: Boolean, required: true, default: false },
    classID: { type: String, required: true },
  },
  { skipVersioning: true }
);

export const Order = model<IOrderModel>('order', OrderSchema, 'gadget-orders');
