import { Component, OnInit, Input } from '@angular/core';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() info?: any;

  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  log(info: any){
	console.log(info);
	const productId = info.id;
	this.cartService.addItemCarrito(productId);
  }

}
