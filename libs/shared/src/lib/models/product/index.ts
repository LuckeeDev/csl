import { Document } from 'mongoose';

export type TSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export class ProductOptions {
  id: string;
  quantity: number;
  color?: string;
  size?: TSize;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  category: 'gadgets' | 'photos';
  price: number;
  fileNames: string[];
  colors?: string[];
  sizes?: TSize[];
}

export interface IProductModel extends Document, IProduct {
  id: string;
}
