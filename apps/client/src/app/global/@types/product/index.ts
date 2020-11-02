export type TSize = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export class ProductOptions {
  id: string;
  color: string;
  size: TSize;
  quantity: number;
}

export interface ProductResInterface {
  success: boolean;
  msg?: string;
  err?: any;
}

export interface IProduct {
  fileNames: string[];
  colors: string[];
  sizes: TSize[];
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}
