import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.services';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.services';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false 
})
export class ProductDetailPage implements OnInit {
  productId: number | null = null;
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id') ?? this.findRouteParam('id');
      const parsedId = idParam ? Number(idParam) : 1;

      this.productId = Number.isFinite(parsedId) && parsedId > 0 ? parsedId : 1;
      this.product = this.productService.getProductById(this.productId);
    });
  }

  private findRouteParam(paramName: string): string | null {
    for (const route of this.route.pathFromRoot) {
      const value = route.snapshot.paramMap.get(paramName);

      if (value) {
        return value;
      }
    }

    return null;
  }
  goToEdit() {
    if (this.product) {
      this.router.navigate(['/product-form', this.product.id]);
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product)
      console.log('Barang ditambahkan:', this.product.nama);

      console.log(this.cartService.cartItems);
    }
  }
  fadeInProductImage() {
    const imageElement = document.querySelector('#productImage') as HTMLElement;

    if (!imageElement) {
      return;
    }

    const animation = this.animationCtrl
      .create()
      .addElement(imageElement)
      .duration(800)
      .keyframes([
        { offset: 0, opacity: '0' },
        { offset: 1, opacity: '1' }
      ]);

    animation.play();
  }
  
  ionViewDidEnter() {
    this.fadeInProductImage();
  }
}
