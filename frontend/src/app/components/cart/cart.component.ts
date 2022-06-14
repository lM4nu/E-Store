import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	nombrecarrito?:string = "hola";
	setcarrito(nombre:string){
		this.nombrecarrito = nombre;
	}

  constructor() { }

  ngOnInit(): void {
  }

}
