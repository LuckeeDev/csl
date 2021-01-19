import { Schema, model } from 'mongoose';
import { ICommissioneModel } from '@csl/shared';

const CommissioneSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    page: { type: Object },
    image: { type: String },
    files: { type: Array, default: [] },
  },
  { skipVersioning: true }
);

export const Commissione = model<ICommissioneModel>(
  'commissione',
  CommissioneSchema,
  'commissioni'
);
