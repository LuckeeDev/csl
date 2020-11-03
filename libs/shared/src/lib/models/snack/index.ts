import { Document } from 'mongoose';

export interface ISnack {
  id: string;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
}

export interface ISnackModel extends Document, ISnack {
  id: string;
}
