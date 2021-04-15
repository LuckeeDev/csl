import { Document } from 'mongoose';
import { ICommissione } from '../commissione';
import { IProduct, TSize } from '../product';

interface UserCourses {
	a: string;
	b: string;
	c: string;
	d: string;
	e: string;
	f: string;
}

interface Confirmed {
	gadgets: boolean;
	photos: boolean;
}

export interface ProductInUserCart {
	quantity: number;

	size: TSize;

	/**
	 * Refers to the ID of the customization (the color).
	 */
	color: IProduct['colors'][number]['id'];

	/**
	 * Refers to the actual identifier of the product.
	 */
	id: IProduct['id'];

	/**
	 * Used to refer to the item inside the user cart, where the user might have
	 * multiple items with the same product ID.
	 */
	cartID: string;

	bundled?: {
		color: IProduct['colors'][number]['id'];

		id: IProduct['id'];

		size: TSize;

		/**
		 * Must be equal or less than the quantity of products ordered in the parent order.
		 */
		quantity: number;
	};
}

export interface IUserInCsv {
	classe: string;
	nome: string;
	email: string;
}

export interface IUser {
	id: string;
	email: string;

	/**
	 * Needed for orders.
	 */
	phone: string;
	name: string;
	classID: string;
	snackCredit: number;
	photoURL: string;
	courses: UserCourses;

	/**
	 * Only exists if `user.isRappreDiClasse === true`.
	 */
	stripeID?: string;

	// Roles
	isVice?: boolean;
	isRappre?: boolean;
	isQp?: boolean;
	isRappreDiClasse?: boolean;
	isBar?: boolean;
	isAdmin?: boolean;
	isReferente?: ICommissione['id'];

	cart: ProductInUserCart[];

	/**
	 * Confirmation status for gadget and photo orders.
	 */
	confirmed: Confirmed;

	/**
	 * Only exists on service accounts.
	 */
	refreshToken?: string;

	/**
	 * Defines if service account is active. Only one service account
	 * can be active at a time.
	 */
	isService?: 'active' | 'inactive';
}

export interface IUserModel extends Document, IUser {
	id: string;
}
