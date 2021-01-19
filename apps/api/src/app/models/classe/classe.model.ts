import { model, Schema } from 'mongoose';
import { IClassModel } from '@csl/shared';

const ClassSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    members: { type: Array, required: true },
    membersCount: { type: Number, required: true },
    gadgetTotal: { type: Number, required: true, default: 0 },
    gadgetPaid: { type: Boolean, required: true, default: false },
    photoTotal: { type: Number, required: true, default: 0 },
    photoPaid: { type: Boolean, required: true, default: false },
  },
  { skipVersioning: true }
);

export const Class = model<IClassModel>('class', ClassSchema, 'classi');
