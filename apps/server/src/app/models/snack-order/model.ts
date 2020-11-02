import { Document } from 'mongoose';
import { IUser } from '../user/model';
import { ISnack } from '../snack/model';

export interface ISnackInCart {
  id: ISnack['id'];
  name: ISnack['name'];
  quantity: number;
}

export interface ISnackOrder extends Document {
  id: IUser['id'];
  cart: ISnackInCart[];
  date: string;
  total: number;
  confirmed: boolean;
  classID: string;
}
