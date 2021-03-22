import { Document } from 'mongoose';
import { IUser } from '../user';

interface Signup {
	id: IUser['id'];
	name: IUser['name'];
}

export interface ICourse {
	id: string;
	title: string;
	description: string;
	category:
		| 'Seminario'
		| 'Approfondimento'
		| 'Tempo libero'
		| 'Dibattito'
		| 'Cineforum';
	slot: 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
	owner: IUser['id'];
	speakers: {
		name: IUser['name'];
		classID: IUser['classID'];
	}[];
	notes: string;
	signups: Signup[];
	max: number;
}

export interface ICourseModel extends Document, ICourse {
	id: string;
}
