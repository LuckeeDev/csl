import { Document } from 'mongoose';

export type TSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  category: 'gadgets' | 'photos';
  price: number;
  fileNames: string[];
  colors?: string[];
  sizes?: TSize[];
}
