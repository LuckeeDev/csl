import { Document } from 'mongoose';

// Interface used in document queries
export interface IUser extends Document {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  classID: string;
  snackCredit: number;
  photoURL?: string;
  stripeID?: string;
  isVice?: boolean;
  isRappre?: boolean;
  isQp?: boolean;
  isRappreDiClasse?: boolean;
  isBar?: boolean;
  isAdmin?: boolean;
}

// Interface used in http requests
export interface IReqUser {
  id?: string;
  email?: string;
  classID?: string;
  isVice?: boolean;
  isRappre?: boolean;
  isQp?: boolean;
  isRappreDiClasse?: boolean;
  isBar?: boolean;
  isAdmin?: boolean;
}

// Interface used to upload CSV data to the database
export interface UserInCsv {
  email: string;
  classe: string;
  nome: string;
  cognome: string;
}
