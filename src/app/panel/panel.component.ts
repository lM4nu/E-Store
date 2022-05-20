import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  products = PRODUCTS;

  constructor() { }

  ngOnInit(): void {
  }

}
