import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.services';
import { TransactionService } from '../../services/transaction.services';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {

  cartItems: CartItem[] = [];
  total: number = 0;

  alertButtons = ['OK'];

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.refreshCart();
  }

  ionViewDidEnter() {
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  tambahQty(productId: number) {
    this.cartService.increaseQuantity(productId);
    this.refreshCart();
  }

  kurangQty(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.refreshCart();
  }

  hapusItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.refreshCart();
  }

  checkout() {
    var items = this.cartService.getCartItems();
    var total = this.cartService.getTotal();
    this.transactionService.addTransaction(items, total);
    this.cartService.clearCart();
    this.refreshCart();
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
}