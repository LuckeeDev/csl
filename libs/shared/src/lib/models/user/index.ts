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

export interface ProductInUserCart {
	quantity: number;

	size: TSize;

	/**
	 * Refers to the ID of the customization (the color).
	 */
	colorID: IProduct['colors'][0]['id'];

	/**
	 * Refers to the actual identifier of the product.
	 */
	id: IProduct['id'];
}

export interface IUserInCsv {
	classe: string;
	nome: string;
	email: string;
}

export interface IUser {
	id: string;
	email: string;
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
