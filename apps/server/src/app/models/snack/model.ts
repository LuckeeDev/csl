import { Document } from 'mongoose';

export interface ISnack extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
}
