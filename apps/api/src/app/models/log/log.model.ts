import { Schema, model } from 'mongoose';
import { ILogModel } from '@csl/shared';

const LogSchema = new Schema(
  {
    timestamp: { type: Date, required: true },
    level: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: Object, required: true },
  },
  { skipVersioning: true }
);

export const Error = model<ILogModel>('error', LogSchema, 'errors');
export const Event = model<ILogModel>('event', LogSchema, 'events');
