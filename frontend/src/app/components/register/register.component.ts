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

  ngOnInit(): void {
    if (this.localStorageService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  login(formInput: any) {
    console.log(formInput.form.value);
    this.authService.registrar(formInput.form.value).subscribe((res: any) => {
      if (res.success) {
        this.localStorageService.setToken(res.token);
        this.localStorageService.setUserId(res.id);
        window.location.replace('/home');
      }
    });
  }
}
