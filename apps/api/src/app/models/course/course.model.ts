import { Schema, model } from 'mongoose';
import { ICourseModel } from '@csl/shared';

const CourseSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  slot: { type: String, required: true },
  owner: { type: String, required: true },
  speakers: { type: Array, required: true },
});

export const Course = model<ICourseModel>('course', CourseSchema);
