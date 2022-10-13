import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() info?: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  log(info: any){
	console.log(info);
	const productId = info.id;
	this.userService.addItemCarrito(productId);
  }

}
