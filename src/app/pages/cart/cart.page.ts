import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
    private router: Router
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

  async checkout() {
    if (this.cartItems.length === 0) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Konfirmasi Transaksi',
      message: 'Total belanja Rp' + this.total + '. Simpan transaksi ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Konfirmasi',
          handler: () => {
            this.transactionService.addTransaction(this.cartItems, this.total);
            this.cartService.clearCart();
            this.refreshCart();
            this.router.navigate(['/transaction-history']);
          }
        }
      ]
    });

    await alert.present();
  }
}