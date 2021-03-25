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
	notes: { type: String },
	signups: { type: Array },
	signupsCount: { type: Number },
	max: { type: Number, default: 100 },
	link: { type: String },
});

export const Course = model<ICourseModel>('course', CourseSchema);
