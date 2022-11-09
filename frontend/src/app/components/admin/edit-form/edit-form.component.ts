import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  // recibe informacion en la variable
  @Input() productInfo: any;

  //evento que emitira en la funcion hide()
  @Output() hideEmit = new EventEmitter();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  // funcion que se ejecuta al clickear submit en el formulario
  edit(form: any) {
    // guardamos los datos del formulario
    // en clave:valor por cada input
    let product = form.form.value;
    /* el input checkbox cuando no esta marcado no tiene el valor
    falso sino '' que al ser evaluado si devuelve falso */
    product.mostrar = Boolean(product.mostrar);
    // si cualquiera de los valores fue dejado vacio se deja el valor
    // que ya tenia, el que se ve en el placeholder
    product.name == ''
      ? (product.name = this.productInfo.name)
      : (product.name = product.name);
    product.price == ''
      ? (product.price = this.productInfo.price)
      : (product.price = product.price);
    product.imgpath == ''
      ? (product.imgpath = this.productInfo.imgpath)
      : (product.imgpath = product.imgpath);

    // si el producto tiene id entonces se llama la funcion edit
    if (this.productInfo.id) {
      // a la funcion edit se le pasa el id y el objeto producto
      this.productsService
        .editProduct(this.productInfo.id, product)
        .subscribe((res: any) => {
          // si la respuesta devuelve success
          if (res.success) {
            //recargar la pagina al editarlo
            window.location.reload();
          }
        });
    } else {
      //si no tiene id es porque estamos agregando uno nuevo
      //llamamos a la funcion addProduct y le pasamos el objeto produto
      this.productsService.addProduct(product).subscribe((res: any) => {
        // si la respuesta devuelve success
        if (res.success) {
          //recargar la pagina al agregarlo
          window.location.reload();
        }
      });
    }
  }

  borrar() {
    // llama a la funcion deleteProduct y le pasa la id correspondiente
    this.productsService
      .deleteProduct(this.productInfo.id)
      .subscribe((res: any) => {
        // si la respuesta devuelve success
        if (res.success) {
          //recargar la pagina al borrarlo
          window.location.reload();
        }
      });
  }

  hide() {
    //emite el valor falso
    this.hideEmit.emit(false);
  }
}
