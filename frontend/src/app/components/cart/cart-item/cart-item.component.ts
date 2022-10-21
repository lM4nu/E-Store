import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() info?: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //console.log(this.info);
  }

  test(num: number, item: any) {
    this.cartService.editarCantidadItem(num, item).subscribe(
      (res: any) => {
        if (res.success) {
          if (this.info.cantidad + num <= 0) {
            this.info = false;
            //this.cartService.cantidad = this.cartService.cantidad - 1;
            this.cartService.editarCantidad(-1);
            //console.log(this.cartService.cantidad);
          } else {
            this.info.cantidad = this.info.cantidad + num;
          }

          //emiter(this.info);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
