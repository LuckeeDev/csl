import { Document } from 'mongoose';

export interface IUserInCsv {
  email: string;
  classe: string;
  nome: string;
  cognome: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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

  // Commissioni
  isArte?: boolean;
  isBiblioteca?: boolean;
  isCinema?: boolean;
  isDibattito?: boolean;
  isGreen?: boolean;
  isFeste?: boolean;
  isLIR?: boolean;
  isMusica?: boolean;
  isOmnia?: boolean;
  isSport?: boolean;
  isTutoring?: boolean;
  isVale?: boolean;
  isAsl?: boolean;
  isConsulta?: boolean;
  isPortarti?: boolean;
}

export interface IUserModel extends Document, IUser {
  id: string;
}
