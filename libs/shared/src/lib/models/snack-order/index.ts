import { Document } from 'mongoose';
import { IUser } from '../user';
import { ISnack } from '../snack';

export interface ISnackInCart {
  id: ISnack['id'];
  name: ISnack['name'];
  quantity: number;
}

export interface ISnackOrder {
  _id: string;
  id: IUser['id'];
  cart: ISnackInCart[];
  date: string;
  total: number;
  confirmed: boolean;
  classID: string;
  name: string;
}

export interface ISocketData {
  change?: ISnackOrder;
  orders?: ISnackOrder[];
  classes?: string[];
  operationType: 'replace' | 'insert' | 'delete' | 'update';
}

export interface ISnackOrderModel extends Document, ISnackOrder {
  _id: string;
  id: string;
}
