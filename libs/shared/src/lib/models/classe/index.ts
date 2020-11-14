import { Document } from 'mongoose';
import { IUser } from '../user';

export type TRole =
  // Admins
  | 'isQp'
  | 'isRappreDiClasse'
  | 'isRappre'
  | 'isVice'
  | 'isBar'
  | 'isAdmin'

  // Commissioni
  | 'isArte'
  | 'isBiblioteca'
  | 'isCinema'
  | 'isDibattito'
  | 'isGreen'
  | 'isFeste'
  | 'isLIR'
  | 'isMusica'
  | 'isOmnia'
  | 'isSport'
  | 'isTutoring'
  | 'isVale'
  | 'isAsl'
  | 'isConsulta'
  | 'isPortarti';

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
