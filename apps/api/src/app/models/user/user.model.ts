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

		cart: { type: Array },

		isVice: { type: Boolean },
		isRappre: { type: Boolean },
		isQp: { type: Boolean },
		isRappreDiClasse: { type: Boolean },
		isBar: { type: Boolean },
		isAdmin: { type: Boolean },
		isReferente: { type: String },

		refreshToken: { type: String },
		isService: { type: String },
	},
	{ skipVersioning: true }
);

export const User = model<IUserModel>('user', UserSchema);
