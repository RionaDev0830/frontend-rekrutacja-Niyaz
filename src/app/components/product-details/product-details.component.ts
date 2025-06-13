import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent {
  @Input() product: Product | null = null; // <-- This is the correct input
  @Output() back = new EventEmitter<void>();
}
