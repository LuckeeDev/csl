import { model, Schema } from 'mongoose';
import { IClassModel } from '@csl/shared';

const ClassSchema = new Schema(
	{
		id: { type: String, required: true, unique: true },
		members: { type: Array, required: true },
		membersCount: { type: Number, required: true },
		paid: { type: Object },
	},
	{ skipVersioning: true }
);

export const Class = model<IClassModel>('class', ClassSchema, 'classi');
