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

  isAdmin = false;

  products: any;

  currentProduct: any;

  ngOnInit(): void {
    const token = this.localStorageService.getToken();

    this.authService.isAdmin(token).subscribe(
      (res: any) => {
        if (!res.admin) {
          this.router.navigate(['/home']);
        } else {
          this.isAdmin = true;

          this.productsService.getAllProducts().subscribe((res: any) => {
            this.products = res;
          }),
            (err: any) => {
              console.log(err);
            };
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addProduct() {
    this.showForm({ name: '', price: '', imgpath: '' });
  }

  showForm(input: any) {
    this.currentProduct = input;
  }

  hideForm(input: any) {
    this.currentProduct = false;
  }
}
