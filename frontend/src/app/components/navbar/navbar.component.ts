import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/localstorage.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  //titulo que se muestra en el template
  title = 'E-Store';

  //icono de fontAwesome
  faCart = faCartShopping;

  /* en el constructor declaro los servicios que voy a usar
  estan declarados como publicos ya que sino no puedo usarlos
  en el template
  */
  constructor(
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // guardamos el token en esta variable
    const token = this.localStorageService.getToken();

    /*solo si estamos logeados, subscribimos la request
    getCarrito a la que debemos pasarle el token de nuestro
    usuario para demostrar quienes somos y esta nos devolvera
    la informacion de los productos que hay en nuestro carrito
    */
    if (this.localStorageService.isLogged()) {
      this.cartService.getCarrito(token).subscribe((res: any) => {
        /* seteamos el valor de cartService a la cantidad
          de elementos que hay en el array de carrito
          que obtenemos en la request */
        this.cartService.cantidad = res.carritoContent.length;
        if (this.cartService.cantidad == 0) {
          /*chequeamos si es 0 para ponerlo como undefined
            como se explica en el template, porque esto es necesario */
          this.cartService.cantidad = undefined;
        }
      });
    }
  }

  logout() {
    this.localStorageService.clear();
    this.cartService.cantidad = undefined;
    if (
      this.router.isActive('/cart', false) ||
      this.router.isActive('/admin', false)
    ) {
      this.router.navigate(['/home']);
    }
  }
}
