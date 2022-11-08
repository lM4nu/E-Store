import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /* este servicio se encarga de todo lo referido al carrito del usuario
  de el obtenemos la cantidad de productos que hay y la cambiamos
  */
  /*
 en el constructor decalramos httpClient porque vamos a hacer request a
 endpoints del backend, el localStorage porque vamos a interactuar con el
 leyendo su informacion y el router para redireccionar
 */
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  // direccion base del endpoint
  API = 'http://localhost:8080';
  /* cantidad de productos que hay en nuestro carrito,
  que se muestra en la navbar si no es undefined
  por defecto lo es */
  cantidad: any;

  /* la cantidad no suele ser editada directamente sino que usamos esta funcion
   * que recibe un numero y se lo suma la cantidad, es decir que si le pasemos
   * un numero negativo se lo restara
   */
  public editarCantidad(num: number) {
    /*antes de sumar el numero me fijo que no sea undefined
    y si es setearlo a 0 de lo contrario dara error */
    if (this.cantidad == undefined) {
      this.cantidad = 0;
    }
    // le sumo el numero que le paso a la funcion, si es un numero negativo se le restara
    this.cantidad = this.cantidad + num;
    //si despues de sumar(o restar) queda en 0, lo seteamos en undefined
    if (this.cantidad <= 0) {
      this.cantidad = undefined;
    }
  }

  /* edita el atributo cantidad de un objeto carrito
  recibe por parametro el numero que modifica (+1 o -1) , se lo suma
  y el objeto a editar con todos sus atributos
  devuelve la request que corresponde
  */
  public editarCantidadItem(num: number, carritoItem: any) {
    const nuevaCantidad = carritoItem.cantidad + num;
    // si la cantidad es 0 o menos hay que devolver una DELETE request
    // ya que de ese producto no hay mas en nuestro carrito
    // hay que borrarlo
    if (nuevaCantidad <= 0) {
      return this.httpClient.delete(
        `${this.API}/carritos/delete/${carritoItem.id}`
      );
    } else {
      //si no quedo en 0, hay que hacer un nuevo objeto pero con la cantidad actualizada
      const nuevoItem = {
        cantidad: nuevaCantidad,
        usuarioid: carritoItem.usuarioid,
        productoid: carritoItem.productoid,
      };
      // y devolvemos la PUT request en vez de la delete
      return this.httpClient.put(
        `${this.API}/carritos/edit/${carritoItem.id}`,
        nuevoItem
      );
    }
  }

  /* esta funcion devuelve la request GET de los contenidos del carrito del usuario
  cuyo token pasemos por parametro a la funcion
  el token es enviado en forma de Header, el header Authoriaztion */
  public getCarrito(token: string) {
    return this.httpClient.get(`${this.API}/data/carrito`, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }

  /*esta funcion se llama cuando clickeamos el + de los items en el panel
  y recibe el id del producto a agregar */
  public addItemCarrito(productoId: any): any {
    // solo si estamos logeados
    if (this.localStorageService.isLogged()) {
      // guardo la id del usuario
      const userId = this.localStorageService.getUserId();
      /* teniendo la id del usuario y la id del producto
      le pido al backend que busque si en la tabla carrito
      existe algun elemento que tenga ambos, es decir si ya tengo ese producto
      en mi carrito */
      this.httpClient
        .post(`${this.API}/carritos/userandproduct`, {
          usuarioid: userId,
          productoid: productoId,
        }) //subscribo la request
        .subscribe((res: any) => {
          /* si la request encontro nada entonces no habia
            y tengo que agregar el producto a mi carrito */
          if (!res.length) {
            /* para agregarlo hago otra request a /add
              con el objecto carrito y la pongo cantidad 1*/
            this.httpClient
              .post(`${this.API}/carritos/add`, {
                cantidad: 1,
                usuarioid: userId,
                productoid: productoId,
              }) //subscribo la request para saber si fue exitosa
              .subscribe((res) => {
                /*si fue exitosa estoy seguro que la cantidad de productos en mi carrito
                    aumento en 1 asi que la actualizo */
                this.editarCantidad(+1);
              });
          } else {
            /* si la request encontro algo entonces ya hay en el carrito del userid
                        un producto con esa productoId
                        y clickear + deberia aumentar su cantidad en 1
                        */
            this.editarCantidadItem(+1, res[0]).subscribe((res) => {});
          }
        });
    } else {
      // si el usuario no estaba logeado y clickeo el + debe ser redireccionado a logearse
      this.router.navigate(['/login']);
    }
  }

  public deleteProduct(id: any) {
    return this.httpClient.delete(`${this.API}/carritos/deleteproduct/${id}`);
  }
}
