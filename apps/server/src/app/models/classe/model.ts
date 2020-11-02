import { Document } from 'mongoose';
import { IUser } from '../user/model';

export type TRole =
  | 'isQp'
  | 'isRappreDiClasse'
  | 'isRappre'
  | 'isVice'
  | 'isBar'
  | 'isGod';

interface IMember {
  email: IUser['email'];
  snackCredit: IUser['snackCredit'];
  roles: TRole[];
}

export interface IClass extends Document {
  id: string;
  members: IMember[];
  membersCount: number;
  gadgetTotal: number;
  gadgetPaid: boolean;
  photoTotal: number;
  photoPaid: boolean;
}
