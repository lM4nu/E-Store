import { Component, OnInit, Input } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

	carrito = CartComponent;

  @Input() info?: any;

  

  log(info: String){

	console.log(info);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
