import { CartItem } from './cart-item.model';

export interface Transaction {
    id: number;
    tanggal: Date;
    items: CartItem[];
    total: number;
}
