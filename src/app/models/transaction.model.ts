import { CartItem } from './cart-item.model';

export interface Transaction {
    id: number;
    tanggal: string;
    items: CartItem[];
    total: number;
}
