import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  /* este servicio se encarga de todo lo relacionado a la informacion
  de los productos, por eso necesita httpclient ya que hara requests
  */
  constructor(private httpClient: HttpClient) {}

  API = 'http://localhost:8080';

  /* hace una request GET para obtener todos los productos
  visibles al publico */
  public getProducts() {
    return this.httpClient.get(`${this.API}/productos/publicall`);
  }

  /* hace una request GET para obtener todos los productos
  incluso los marcados como ocultos*/
  public getAllProducts() {
    return this.httpClient.get(`${this.API}/productos/all`);
  }

  /* hace una request GET para obtener los detalles de un producto
  conociendo su id */
  public getProduct(id: any) {
    return this.httpClient.get(`${this.API}/productos/get/${id}`);
  }

  /* hace una request PUT para editar un producto
  conociendo su id y enviando un modelo de producto nuevo en el body*/
  public editProduct(id: any, data: any) {
    return this.httpClient.put(`${this.API}/productos/edit/${id}`, data);
  }

  /* hace una request DELETE para borrar un producto
  conociendo su id */
  public deleteProduct(id: any) {
    return this.httpClient.delete(`${this.API}/productos/delete/${id}`);
  }

  /* hace una request POST para agregar un producto
  enviando en el body el modelo*/
  public addProduct(data: any) {
    return this.httpClient.post(`${this.API}/productos/add`, data);
  }
}
