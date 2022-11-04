import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  login(formData: any) {
    this.authService.logear(formData.form.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.localStorageService.setToken(res.token);
          this.localStorageService.setUserId(res.id);
          this.cartService.getCarrito(res.token).subscribe((res: any) => {
            if (res.carritoContent.length == 0) {
              this.cartService.cantidad = undefined;
            } else {
              this.cartService.cantidad = res.carritoContent.length;
            }
          });
          if (res.admin) {
            //window.location.replace('/admin');
            this.router.navigate(['/admin']);
          } else {
            //window.location.replace('/home');
            this.router.navigate(['/home']);
          }
        } else {
          console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
