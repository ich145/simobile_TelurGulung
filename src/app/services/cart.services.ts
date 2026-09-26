import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { ProductService } from './product.services';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];

    constructor(private productService: ProductService) { }

    addToCart(product: Product) {
        if (product.stok <= 0) {
            return;
        }

        var found = false;
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == product.id) {
                this.cartItems[i].quantity++;
                found = true;
                break;
            }
        }
        if (found == false) {
            this.cartItems.push({ product: product, quantity: 1 });
        }

        this.productService.kurangiStok(product.id, 1);
    }

    increaseQuantity(productId: number) {
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == productId) {
                if (this.cartItems[i].product.stok > 0) {
                    this.cartItems[i].quantity++;
                    this.productService.kurangiStok(productId, 1);
                }
                break;
            }
        }
    }

    decreaseQuantity(productId: number) {
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id == productId) {
                this.cartItems[i].quantity--;
                this.productService.tambahStok(productId, 1);
                if (this.cartItems[i].quantity <= 0) {
                    this.removeFromCart(productId);
                }
                break;
            }
        }
    }

    removeFromCart(productId: number) {
        var newCartItems: CartItem[] = [];
        for (var i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i].product.id != productId) {
                newCartItems.push(this.cartItems[i]);
            } else {
                this.productService.tambahStok(productId, this.cartItems[i].quantity);
            }
        }
        this.cartItems = newCartItems;
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