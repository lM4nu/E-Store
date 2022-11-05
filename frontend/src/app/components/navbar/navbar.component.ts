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
  title = 'E-Store';

  faCart = faCartShopping;
  isLogged = true;

  constructor(
    public localStorageService: LocalStorageService,
    public cartService: CartService,
    private router: Router
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
