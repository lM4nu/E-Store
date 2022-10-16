import { Component, OnInit } from '@angular/core';
import {CartService} from '../services/cart.service';
import {LocalStorageService} from '../services/localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title= "E-Store";
  productsCount?:any;

  constructor(private localStorageService: LocalStorageService, private cartService: CartService) { }

  ngOnInit(): void {
	  const token = this.localStorageService.getToken();
	  if(this.localStorageService.isLogged()) {
		  this.cartService.getCarrito(token).subscribe((res:any) => {
			  this.productsCount = res.carritoContent.length;
		  },(err) => {
			  this.productsCount = 0;
			  console.log(err);
		  });
	  }else{
		  this.productsCount = undefined;
	  }
  }

}
