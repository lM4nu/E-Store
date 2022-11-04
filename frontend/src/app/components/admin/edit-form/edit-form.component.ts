import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  @Input() productInfo: any;

  @Output() hideEmit = new EventEmitter();

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  edit(form: any) {
    let dataRequest = form.form.value;

    if (this.productInfo.id) {
      this.productsService
        .editProduct(this.productInfo.id, dataRequest)
        .subscribe((res: any) => {
          if (res.success) {
            window.location.reload();
            //this.hide();
          }
        });
    } else {
      this.productsService.addProduct(dataRequest).subscribe((res: any) => {
        if (res.success) {
          window.location.reload();
          //this.hide();
        }
      });
    }
  }

  borrar() {
    //console.log(this.productInfo.id);
    this.productsService
      .deleteProduct(this.productInfo.id)
      .subscribe((res: any) => {
        if (res.success) {
          window.location.reload();
        }
      });
  }

  hide() {
    //this.productInfo = false;
    this.hideEmit.emit(false);
  }
}
