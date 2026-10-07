import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private cartService: CartService,
    private transactionService: TransactionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshCart();
  }

  ionViewWillEnter() {
    this.refreshCart();
  }

  refreshCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  getTotal(): number {
    return this.cartService.getTotal();
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
    if (items.length === 0) {
      return;
    }

    var total = this.cartService.getTotal();
    
    // 1. Simpan ke TransactionService
    this.transactionService.addTransaction(items, total);
    
    // 2. Kosongkan keranjang
    this.cartService.clearCart();
    this.refreshCart();

    // 3. Pindah halaman menggunakan Router Angular
    this.router.navigate(['/transaction-history']);
  }
}