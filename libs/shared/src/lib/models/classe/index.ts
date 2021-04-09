import { Document } from 'mongoose';
import { IProduct } from '../product';
import { IUser } from '../user';

type ClassPaidStatus = Record<IProduct['category'], boolean>;

export type TRole =
	// Admins
	| 'isQp'
	| 'isRappreDiClasse'
	| 'isRappre'
	| 'isVice'
	| 'isBar'
	| 'isAdmin'

	// Referenti
	| 'isReferente[arte]'
	| 'isReferente[biblioteca]'
	| 'isReferente[cinema]'
	| 'isReferente[dibattito]'
	| 'isReferente[green]'
	| 'isReferente[feste]'
	| 'isReferente[lir]'
	| 'isReferente[musica]'
	| 'isReferente[omnia]'
	| 'isReferente[sport]'
	| 'isReferente[tutoring]'
	| 'isReferente[vale]'
	| 'isReferente[asl]'
	| 'isReferente[consulta]'
	| 'isReferente[portarti]';

export interface IRole {
	description: string;
	role: TRole;
}

interface IMember {
	email: IUser['email'];
	snackCredit: IUser['snackCredit'];
	roles?: any[];
}

export interface IClass {
	id: string;
	members: IMember[];
	membersCount: number;
	paid: ClassPaidStatus;
}

export interface IClassModel extends Document, IClass {
	id: string;
}
