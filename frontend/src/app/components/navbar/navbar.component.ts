import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../services/localstorage.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title= "E-Store";
  productsCount?:any;

  constructor(private localStorageService: LocalStorageService, private userService: UserService) { }

  ngOnInit(): void {
	  const token = this.localStorageService.getToken();
	  if(this.localStorageService.isLogged()) {
		  this.userService.getCarrito(token).subscribe((res:any) => {
			  this.productsCount = res.carritoContent.length;
			  console.log(res);
		  },(err) => {
			  this.productsCount = 0;
			  console.log(err);
		  });
	  }else{
		  this.productsCount = undefined;
	  }
  }



}
