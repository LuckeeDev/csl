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
	signups: { type: Array },
	option1: { type: Number },
	option2: { type: Number },
	option3: { type: Number },
});

export const Course = model<ICourseModel>('course', CourseSchema);
