import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

	API_URL="http://localhost:8080";
  constructor(private httpClient: HttpClient) { }



  public getProducts(){
	 return this.httpClient.get(`${this.API_URL}/productos/all`);
  }


  public async getProduct(id:any){
	  let info;
	 const data = await this.httpClient.get(`${this.API_URL}/productos/get/${id}`).toPromise().then((dataa) => {
		 info = dataa;
	 });
	 return info;
  }




}
