import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {


  constructor(private productsService: ProductsService) { }

  products:any;

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((res:any)=>{
          this.products = res;
      }),
      (err:any) => {
        console.log(err);
      };
  }

}
