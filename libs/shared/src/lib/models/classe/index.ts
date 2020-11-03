import { Document } from 'mongoose';
import { IUser } from '../user';

export type TRole =
  | 'isQp'
  | 'isRappreDiClasse'
  | 'isRappre'
  | 'isVice'
  | 'isBar'
  | 'isAdmin';

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
  gadgetTotal: number;
  gadgetPaid: boolean;
  photoTotal: number;
  photoPaid: boolean;
}

export interface IClassModel extends Document, IClass {
  id: string;
}
