import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/localstorage.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
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
}
