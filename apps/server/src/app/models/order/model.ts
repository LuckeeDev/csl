import { Document } from 'mongoose';
import { IUser } from '../user/model';
import { IProduct, TSize } from '../product/model';

export interface IProductInCart {
  id: IProduct['id'];
  quantity: number;
  size?: TSize;
  color?: string;
}

export interface IOrder extends Document {
  id: IUser['id'];
  gadgets: IProductInCart[];
  photos: IProductInCart[];
  gadgetTotal: number;
  photoTotal: number;
  gadgetsConfirmed: boolean;
  photosConfirmed: boolean;
  classID: string;
}
