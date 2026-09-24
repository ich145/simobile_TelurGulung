import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.services';
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
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

}
