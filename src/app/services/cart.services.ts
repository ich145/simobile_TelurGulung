import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];

    constructor() { }

    addToCart(product: Product) {
        var found = false;

        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == product.id) {
                if (this.cartItems[i].quantity < product.stok) {
                    this.cartItems[i].quantity++;
                }
                found = true;
                break;
            }
        }
        if (found == false) {
            this.cartItems.push({product: product, quantity: 1});
        }
    }

    increaseQuantity(productId: number) {
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == productId) {
                if (this.cartItems[i].quantity < this.cartItems[i].product.stok) {
                    this.cartItems[i].quantity++;
                }
                break;
            }
        }
    }

    decreaseQuantity(productId: number) {
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == productId) {
                this.cartItems[i].quantity--;
                if (this.cartItems[i].quantity <= 0) {
                    this.cartItems.splice(i, 1);
                }
                break;
            }
        }
    }

    removeFromCart(productId: number) {
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == productId) {
                this.cartItems.splice(i, 1);
                break;
            }
        }
    }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    getTotal(): number {
        var total = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
            total += this.cartItems[i].product.hargaJual * this.cartItems[i].quantity;
        }
        return total;
    }

    clearCart() {
        this.cartItems = [];
    }
}