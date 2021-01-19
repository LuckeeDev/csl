import { model, Schema } from 'mongoose';
import { IEventModel } from '@csl/shared';

const EventSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  preview: { type: String, required: true },
  date: { type: Date, required: true },
  cover: { type: String, required: true },
  signup: { type: String, required: true },
});

export const Event = model<IEventModel>(
  'orientamento-event',
  EventSchema,
  'orientamento-events'
);
