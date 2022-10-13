import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/localstorage.service';
import {ProductsService} from '../services/products.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


	cartData?:any;

  constructor(private localStorageService: LocalStorageService,
	      private userService: UserService, private router: Router,
	     private productsService: ProductsService) { }

  ngOnInit(): void {
	  const token = this.localStorageService.getToken();
	  if(this.localStorageService.isLogged()) {
		  this.userService.getCarrito(token).subscribe((res:any) => {
			  this.cartData = res.carritoContent;
			  res.carritoContent
			  .map((x:any) => {
				  const productinfo = this.productsService.getProduct(x.productoid).then((x) => x);
				  console.log(productinfo);
				  return x;
			  });

			  //console.log(res.carritoContent);
		  },(err) => {
			  console.log(err);
		  });
	  }else{
		  this.router.navigate(['/login']);
	  }
  }

}
