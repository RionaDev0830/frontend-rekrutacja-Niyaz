import { Component } from '@angular/core';
import { PRODUCTS } from './data/products';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  products = PRODUCTS;
  selectedProductId: number | null = null;

  get selectedProduct(): Product | null {
    return this.products.find(p => p.id === this.selectedProductId) || null;
  }

  onSelectProduct(id: number) {
    this.selectedProductId = id;
  }

  onBackToList() {
    this.selectedProductId = null;
  }
}
