import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  // se recibira informacion para esta variable
  @Input() productInfo?: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  add(info: any) {
    const productId = info.id;
    /* se llama a cartService para que agregue
    el producto con esa id */
    this.cartService.addItemCarrito(productId);
  }
}
