import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css'],
})
export class AdminItemComponent implements OnInit {
  @Input() info?: any;

  @Output() event = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  editar(info: any) {
    this.event.emit(info);
  }
}
