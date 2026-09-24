import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, nama: 'Beras 5kg', stok: 12, hargaBeli: 60000, hargaJual: 72000, kategori: 'Sembako', urlGambar: 'https://via.placeholder.com/150' },
    { id: 2, nama: 'Minyak Goreng 2L', stok: 0, hargaBeli: 30000, hargaJual: 35000, kategori: 'Sembako', urlGambar: '' },
    { id: 3, nama: 'Gula Pasir 1kg', stok: 20, hargaBeli: 13000, hargaJual: 16000, kategori: 'Sembako', urlGambar: 'https://via.placeholder.com/150' },
    { id: 4, nama: 'Mie Goreng', stok: 50, hargaBeli: 2800, hargaJual: 3500, kategori: 'Makanan', urlGambar: 'https://via.placeholder.com/150' },
    { id: 5, nama: 'Susu', stok: 15, hargaBeli: 10000, hargaJual: 12500, kategori: 'Minuman', urlGambar: 'https://via.placeholder.com/150' },
    { id: 6, nama: 'Kopi sachet 165g', stok: 8, hargaBeli: 12000, hargaJual: 15000, kategori: 'Minuman', urlGambar: '' },
    { id: 7, nama: 'Sabun Cuci', stok: 5, hargaBeli: 20000, hargaJual: 24000, kategori: 'Kebutuhan Rumah', urlGambar: 'https://via.placeholder.com/150' },
    { id: 8, nama: 'Teh kotak 50', stok: 0, hargaBeli: 8000, hargaJual: 10500, kategori: 'Minuman', urlGambar: 'https://via.placeholder.com/150' },
    { id: 9, nama: 'Tepung 3kg', stok: 18, hargaBeli: 11000, hargaJual: 13500, kategori: 'Sembako', urlGambar: 'https://via.placeholder.com/150' },
    { id: 10, nama: 'Biskuit', stok: 25, hargaBeli: 7000, hargaJual: 9000, kategori: 'Makanan', urlGambar: '' }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  //add new product to the list
  addProduct(product: Product): void {
    this.products.push(product);
  }

  //edit product that already exists in the list
  updateProduct(updatedProduct: Product): boolean {
    const index = this.products.findIndex(
      product => product.id === updatedProduct.id
    );

    if (index === -1) {
      return false;
    }

    this.products[index] = updatedProduct;
    return true;
  }

  //buat ID baru
  getNextId(): number {
    if (this.products.length === 0) {
      return 1;
    }

    return Math.max(...this.products.map(product => product.id)) + 1;
  }
}