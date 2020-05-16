import { Product } from './Product';

export class Bill {
    email: string;
    date?: string;
    price: number;
    products?: Product[];

}