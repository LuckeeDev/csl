import { model, Schema } from 'mongoose';
import { IUserModel } from '@csl/shared';

const UserSchema = new Schema(
	{
		id: { type: String },
		email: { type: String, required: true, unique: true },
		phone: { type: String },
		name: { type: String, required: true },
		classID: { type: String },
		snackCredit: { type: Number, default: 0 },
		photoURL: { type: String },
		stripeID: { type: String },

		courses: { type: Object },

		cart: { type: Array },
		confirmed: { type: Object },

		isVice: { type: Boolean },
		isRappre: { type: Boolean },
		isQp: { type: Boolean },
		isRappreDiClasse: { type: Boolean },
		isBar: { type: Boolean },
		isAdmin: { type: Boolean },
		isReferente: { type: String },

		isStripe: { type: Boolean },

		refreshToken: { type: String },
		isService: { type: String },
	},
	{ skipVersioning: true }
);

export const User = model<IUserModel>('user', UserSchema);
