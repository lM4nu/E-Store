import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private productsService: ProductsService,
    private localStorageService: LocalStorageService
  ) {}

  // se inicializa la variable con un valor falso
  isAdmin = false;

  // se inicializa la variable
  products: any;

  // se inicializa la variable
  currentProduct: any;

  ngOnInit(): void {
    // guardamos el token en esta variable
    const token = this.localStorageService.getToken();

    /*subscribimos la request de la funcion isAdmin
    a la que debemos pasarle el token del usuario admin
    para demostrar quienes somos y esta nos devolvera
    true o false si es correcto
    */
    this.authService.isAdmin(token).subscribe((res: any) => {
      // si no somos admin, redireccionar a home
      if (!res.admin) {
        this.router.navigate(['/home']);
      } else {
        // si somos admin, cambiar isAdmin a true para que se muestre el template
        this.isAdmin = true;

        // fetchear todos los productos incluidos los ocultos
        this.productsService.getAllProducts().subscribe((res: any) => {
          //guardarlos en products
          this.products = res;
        });
      }
    });
  }

  // muestra el formulario y le pasa un objeto productos vacio sin id
  addProduct() {
    this.showForm({ name: '', price: '', imgpath: '' });
  }

  // recibe un producto y lo asigna a current product
  // mostrando asi el formulario con esos datos para editar ese
  // producto en especifico
  showForm(product: object) {
    this.currentProduct = product;
  }

  //recibe un boolean (siempre es falso) para unsetear currentProduct
  //y asi ocultar el formulario
  hideForm(input: boolean) {
    this.currentProduct = input;
  }
}
