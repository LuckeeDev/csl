import { Document } from 'mongoose';
import { IUser } from '../user';

export interface ICourse {
	id: string;
	title: string;
	description: string;
	category: string;
	slot: string;
	owner: IUser['id'];
	speakers: {
		name: IUser['name'];
		classID: IUser['classID'];
	}[];
}

export interface ICourseModel extends Document, ICourse {
	id: string;
}
