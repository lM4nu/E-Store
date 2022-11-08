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
  /* para logearnos vamos a tener que subscribir
  las requests de authService, si nos logeamos correctamente vamos
  a guardar en localStorage el token e id que recibamos,
  vamos a tener que fetchear el carrito del usuario logeado
  y vamos a ser redireccionados, por eso son necesarios
  todos estos servicios */
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
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
  login(formData: any) {
    // primero revisamos si el formulario es valido
    if (formData.form.status == 'VALID') {
      /*si es valido le pasamos a auth service los datos que ingresamos
      es decir un objeto con nombre y contraseña */
      this.authService.logear(formData.form.value).subscribe((res: any) => {
        //si la response nos devuelve que fue exitosa
        if (res.success) {
          //vamos a setear en localStorage los datos que nos devolvio
          this.localStorageService.setToken(res.token);
          this.localStorageService.setUserId(res.id);
          // fetcheamos el carrito del usuario logeado
          this.cartService.getCarrito(res.token).subscribe((res: any) => {
            /* hago la misma logica para saber si mostrar o no
              en la navbar la cantidad de items */
            if (res.carritoContent.length == 0) {
              this.cartService.cantidad = undefined;
            } else {
              this.cartService.cantidad = res.carritoContent.length;
            }
          });
          // si la respuesta nos dice que fue exitosa y tambien somos admin
          if (res.admin) {
            /* redirigir al componente admin */
            //window.location.replace('/admin');
            this.router.navigate(['/admin']);
          } else {
            /* sino no somos admin pero sigue siendo exitos, es decir somos un usuario normal */
            /* somos redireccionados al home*/
            //window.location.replace('/home');
            this.router.navigate(['/home']);
          }
        } else {
          //si la response no nos devuelve success entonces logeamos el error
          console.log(res);
        }
      });
    } else {
      // si el formulario no es valido setear msg
      this.msg = 'falta ingresar datos';
    }
  }
}
