import { PlatformStatusModel } from '@csl/shared';
import { model, Schema } from 'mongoose';

const PlatformSchema = new Schema(
	{
		id: { type: String, required: true },
		status: { type: Object },
	},
	{ skipVersioning: true }
);

export const Platform = model<PlatformStatusModel>('platform', PlatformSchema, 'platform');
