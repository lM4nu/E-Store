import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  //inicializa cartItem como undefined
  @Input() cartItem?: any;
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  // recibe un numero y un objeto item de carrito
  add(num: number, cartItem: object) {
    /* llama a la funcion de cartService que se encarga de editar
    le pasa los parametros necesarios
    y subscribe la request que devuelve */
    this.cartService.editarCantidadItem(num, cartItem).subscribe((res: any) => {
      /* si la response devuelve sucess, estamos seguros que en el backend se edito
        asi que actualizo el frontend*/
      if (res.success) {
        /* si es 0 o menos fue borrado asi que lo ocultamos
          la proxima vez que entremos o refresheemos directamente no sera fetcheado */
        if (this.cartItem.cantidad + num <= 0) {
          this.cartItem = false;
          this.cartService.editarCantidad(num);
        } else {
          // si no fue borrado actualizamos la cantidad
          this.cartItem.cantidad = this.cartItem.cantidad + num;
        }
      }
    });
  }
}
