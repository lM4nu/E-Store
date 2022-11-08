import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  //inicializado products
  products: any;

  ngOnInit(): void {
    /*al iniciar el componente fetchear todos los productos y guardarlos
    en la variable products */
    this.productsService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }
}
