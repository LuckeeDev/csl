export type TRole =
  | 'isQp'
  | 'isRappreDiClasse'
  | 'isRappre'
  | 'isVice'
  | 'isBar'
  | 'isGod';

export interface IRole {
  description: string;
  role: TRole;
}

interface IMember {
  email: string;
  snackCredit: number;
  roles?: any[];
}

export interface IClasse {
  id: string;
  gadgetPaid: boolean;
  gadgetTotal: number;
  photoPaid: boolean;
  photoTotal: number;
  members: IMember[];
  membersCount: number;
}
