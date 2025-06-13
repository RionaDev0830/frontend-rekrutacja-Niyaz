import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  @Input() products: Product[] = []; // <-- Add this line
  @Input() selectedProductId: number | null = null; // Optional, for selection
  @Output() selectProduct = new EventEmitter<number>(); // Optional, for selection
}