import { Document } from 'mongoose';
import { ICommissione } from '../commissione';

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
