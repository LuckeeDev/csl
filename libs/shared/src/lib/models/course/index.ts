import { Document } from 'mongoose';
import { IUser } from '../user';

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
	signups: IUser['email'][];
	option1: number;
	option2: number;
	option3: number;
}

export interface ICourseModel extends Document, ICourse {
	id: string;
}
