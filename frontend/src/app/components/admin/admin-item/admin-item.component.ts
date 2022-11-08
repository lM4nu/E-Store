import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css'],
})
export class AdminItemComponent implements OnInit {
  // recibe un objeto producto
  @Input() productInfo?: any;

  //evento que emitira en la funcion editar()
  @Output() currentProductEvent = new EventEmitter();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  // hace que el emitter emita el objeto con todos los productos al padre
  editar(product: object) {
    this.currentProductEvent.emit(product);
  }
}
