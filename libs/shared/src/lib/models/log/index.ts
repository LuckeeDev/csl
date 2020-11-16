import { IUser } from '../user';

export interface ILogMetadata {
  user: IUser['email'];
  category: 'commissioni' | 'orders' | 'payments' | 'qp';
  newState?: boolean;
  err?: string;
}
