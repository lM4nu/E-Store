import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'E-Store';

  isLogged = true;

  constructor(
    public localStorageService: LocalStorageService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    const token = this.localStorageService.getToken();
    if (this.localStorageService.isLogged()) {
      this.cartService.getCarrito(token).subscribe(
        (res: any) => {
          this.cartService.cantidad = res.carritoContent.length;
          if (this.cartService.cantidad == 0) {
            this.cartService.cantidad = undefined;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
