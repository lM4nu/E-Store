import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  name = "product 1";
  @Input() item?: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
