import { Document } from 'mongoose';
import { ICommissione } from '../commissione';

interface UserCourses {
	a: [string, string, string];
	b: [string, string, string];
	c: [string, string, string];
	d: [string, string, string];
	e: [string, string, string];
	f: [string, string, string];
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
}

export interface IUserModel extends Document, IUser {
	id: string;
}
