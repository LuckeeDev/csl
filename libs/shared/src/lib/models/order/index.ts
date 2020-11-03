import { Document } from 'mongoose';
import { IUser } from '../user';
import { IProduct, TSize } from '../product';

export type ActionType = 'Cancella' | 'Conferma';

export interface IUserOrders {
  gadgets: IProductInCart[];
  photos: IProductInCart[];
  gadgetsConfirmed: boolean;
  photosConfirmed: boolean;
}

export interface DataInterface {
  product?: IProductInCart;
  action: ActionType;
}

export interface IProductInCart {
  id: IProduct['id'];
  quantity: number;
  size?: TSize;
  color?: string;
}

export interface IOrder {
  id: IUser['id'];
  gadgets: IProductInCart[];
  photos: IProductInCart[];
  gadgetTotal: number;
  photoTotal: number;
  gadgetsConfirmed: boolean;
  photosConfirmed: boolean;
  classID: string;
}

export interface IOrderModel extends Document, IOrder {
  id: string;
}
