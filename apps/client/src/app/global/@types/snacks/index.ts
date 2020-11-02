import { UserInterface } from '../user';

export interface ISnackInCart {
  id: ISnack['id'];
  name: ISnack['name'];
  quantity: number;
}

export interface ISnack {
  id: string;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
}

export interface ISnackOrder {
  id: UserInterface['id'];
  cart: ISnackInCart[];
  date: string;
  total: number;
  confirmed: boolean;
  classID: string;
  name: string;
  _id: string;
}

export interface SocketData {
  change?: ISnackOrder;
  orders?: ISnackOrder[];
  classes?: string[];
  operationType: 'replace' | 'insert' | 'delete' | 'update';
}
