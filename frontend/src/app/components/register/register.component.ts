import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  msg: any;

  ngOnInit(): void {
    if (this.localStorageService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  login(formInput: any) {
    if (formInput.form.status == 'VALID') {
      this.authService.registrar(formInput.form.value).subscribe((res: any) => {
        if (res.success) {
          this.localStorageService.setToken(res.token);
          this.localStorageService.setUserId(res.id);
          window.location.replace('/home');
        }
      });
    } else {
      this.msg = 'Falta ingresar datos';
    }
  }
}
