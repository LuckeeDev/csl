import { IUser } from '../user';

export interface IAccount {
  email: IUser['email'];
  name: IUser['name'];
  classID: IUser['classID'];
}
