import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  API = 'http://localhost:8080';

  public getProducts() {
    return this.httpClient.get(`${this.API}/productos/publicall`);
  }

  public getAllProducts(){
    return this.httpClient.get(`${this.API}/productos/all`);
  }

  public getProduct(id: any) {
    return this.httpClient.get(`${this.API}/productos/get/${id}`);
  }

  public editProduct(id: any, data: any) {
    return this.httpClient.put(`${this.API}/productos/edit/${id}`, data);
  }

  public deleteProduct(id: any) {
    return this.httpClient.delete(`${this.API}/productos/delete/${id}`);
  }

  public addProduct(data: any) {
    return this.httpClient.post(`${this.API}/productos/add`, data);
  }
}
