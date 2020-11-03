import { IUser } from '../user';

export interface IAccount {
  email: IUser['email'];
  firstName: IUser['firstName'];
  lastName: IUser['lastName'];
  classID: IUser['classID'];
}
