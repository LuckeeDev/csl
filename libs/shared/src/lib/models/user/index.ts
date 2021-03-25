import { Document } from 'mongoose';
import { ICommissione } from '../commissione';

interface UserCourses {
	a: string;
	b: string;
	c: string;
	d: string;
	e: string;
	f: string;
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
	stripeID?: string;
	isVice?: boolean;
	isRappre?: boolean;
	isQp?: boolean;
	isRappreDiClasse?: boolean;
	isBar?: boolean;
	isAdmin?: boolean;
	isReferente?: ICommissione['id'];

	refreshToken?: string;
}

export interface IUserModel extends Document, IUser {
	id: string;
}
