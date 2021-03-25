import { model, Schema } from 'mongoose';
import { IUserModel } from '@csl/shared';

const UserSchema = new Schema(
	{
		id: { type: String },
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		classID: { type: String },
		snackCredit: { type: Number, default: 0 },
		photoURL: { type: String },
		stripeID: { type: String },
		courses: { type: Object },
		isVice: { type: Boolean },
		isRappre: { type: Boolean },
		isQp: { type: Boolean },
		isRappreDiClasse: { type: Boolean },
		isBar: { type: Boolean },
		isAdmin: { type: Boolean },
		isReferente: { type: String },

		accessToken: { type: Object },
	},
	{ skipVersioning: true }
);

export const User = model<IUserModel>('user', UserSchema);
