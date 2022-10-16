import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  API="http://localhost:8080";

  public getProducts(){
	 return this.httpClient.get(`${this.API}/productos/all`);
  }

  public getProduct(id:any){
	 return this.httpClient.get(`${this.API}/productos/get/${id}`)
  }

}
