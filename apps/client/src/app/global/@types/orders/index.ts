import { TSize } from '@global/@types/product';

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

export interface ResInterface {
    success: boolean;
    msg?: string;
    err?: any;
}
