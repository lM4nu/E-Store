import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../services/cart.service';
import {LocalStorageService} from '../services/localstorage.service';
import {ProductsService} from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
	      private cartService: CartService, private router: Router,
	      private productsService: ProductsService) { }

  cartData?:any

  ngOnInit(): void {
	  const token = this.localStorageService.getToken();
	  if(this.localStorageService.isLogged()){
    		this.cartService.getCarrito(token)
		.subscribe(
			(res:any)=> {
				this.cartData = res.carritoContent;
				this.cartData.forEach( (item:any, index:any) => { 
					this.productsService.getProduct(item.productoid)
					.subscribe(
						(res) => {
							this.cartData[index].details = res;
						},(err) => {
							console.log(err);
						})
				});
			}, 
			(err) => {console.log(err)})
	  }else{
		  this.router.navigate(['/login']);
	  }
  }

}
