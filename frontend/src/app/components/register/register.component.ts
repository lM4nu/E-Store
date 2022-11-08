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
  /* para registrarnos vamos a tener que subscribir
  las requests de authService, si nos registramos correctamente vamos
  a ser logeados y se van a guardar en localStorage el token e id que recibamos
  y vamos a ser redireccionados, por eso son necesarios
  todos estos servicios */
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  //inicialiado msg con undefined por defecto
  msg: any;

  ngOnInit(): void {
    //al iniciar revisar si ya estamos logeados
    if (this.localStorageService.isLogged()) {
      //si ya lo estamos entonces redirigir al home
      this.router.navigate(['/home']);
    }
  }

  /*funcion que recibe los datos del formulario del template
  que nos logeara */
  login(formInput: any) {
    // primero revisamos si el formulario es valido
    if (formInput.form.status == 'VALID') {
      /*si es valido le pasamos a auth service los datos que ingresamos
      es decir un objeto con nombre de usuario, nombre real y contraseña */
      this.authService.registrar(formInput.form.value).subscribe((res: any) => {
        if (res.success) {
          //vamos a setear en localStorage los datos que nos devolvio
          this.localStorageService.setToken(res.token);
          this.localStorageService.setUserId(res.id);
          // y ser redirigidos al home
          window.location.replace('/home');
        }
      });
    } else {
      // si el formulario no es valido setear msg
      this.msg = 'Falta ingresar datos';
    }
  }
}
