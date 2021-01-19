import { Schema, model } from 'mongoose';
import { ICourseModel } from '@csl/shared';

const CourseSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: String },
  duration: { type: Number, required: true },
  slots: { type: Array, required: true },
  owner: { type: String, required: true },
  speakers: { type: Array, required: true },
  status: { type: String, required: true, default: 'WAITING' },
});

export const Course = model<ICourseModel>('course', CourseSchema);
