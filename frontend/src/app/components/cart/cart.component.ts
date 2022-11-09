import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/localstorage.service';
import { ProductsService } from '../services/products.service';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  constructor(
    private localStorageService: LocalStorageService,
    public cartService: CartService,
    private router: Router,
    private productsService: ProductsService
  ) {}

  //inicializar cardData como undefined
  cartData?: any;

  ngOnInit(): void {
    // al inicializar el componente guardar el token del usuario
    const token = this.localStorageService.getToken();
    //solo si el usuario esta logeado
    if (this.localStorageService.isLogged()) {
      // fetchear el carrito de ese usuario
      this.cartService.getCarrito(token).subscribe((res: any) => {
        // guardar el array en la variable cartData
        this.cartData = res.carritoContent;
        this.cartData.forEach((cartItem: any, index: any) => {
          // cada item del carrito tiene el atributo productoid
          // que podemos usar para tener los detalles del producto
          this.productsService
            .getProduct(cartItem.productoid)
            .subscribe((res) => {
              this.cartData[index].details = res;
              // y los asignamos al atributo details de cada uno
            });
        });
      });
    } else {
      // si no esta logeado redireccionar a login
      this.router.navigate(['/login']);
    }
  }

  // recibe un numero y el indice del elemento carrito a editar
  add(num: number, index: number) {
    /* llama a la funcion de cartService que se encarga de editar
    le pasa los parametros necesarios
    y subscribe la request que devuelve */
    this.cartService
      .editarCantidadItem(num, this.cartData[index])
      .subscribe((res: any) => {
        /* si la response devuelve sucess, estamos seguros que en el backend se edito
        asi que actualizo el frontend*/
        if (res.success) {
          /* si es 0 o menos fue borrado asi que lo ocultamos
          la proxima vez que entremos o refresheemos directamente no sera fetcheado */
          if (this.cartData[index].cantidad + num <= 0) {
            this.cartData[index] = false;
            this.cartService.editarCantidad(num);
          } else {
            //si no fue borrado actualizamos la cantidad
            this.cartData[index].cantidad = this.cartData[index].cantidad + num;
          }
        }
      });
  }
}
