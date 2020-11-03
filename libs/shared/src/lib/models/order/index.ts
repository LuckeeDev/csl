import { Document } from 'mongoose';
import { IUser } from '../user';
import { IProduct, TSize } from '../product';

export type ActionType = 'Cancella' | 'Conferma';

export interface ProductInterface {
    id: string;
    quantity: number;
    color: string;
    size: TSize;
}

export interface OrdersInterface {
  gadgets: ProductInterface[];
  photos: ProductInterface[];
  gadgetsConfirmed: boolean;
  photosConfirmed: boolean;
}

export interface DataInterface {
  product?: ProductInterface;
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
