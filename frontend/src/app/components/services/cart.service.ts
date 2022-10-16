import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  API="http://localhost:8080";

  public getCarrito(token:string){
	  return this.httpClient.get(`${this.API}/data/carrito`, { headers: new HttpHeaders({'Authorization': token})}  );
  }

  public addItemCarrito(productoId:any):any{

	  if(this.localStorageService.isLogged()){
	  const userId = this.localStorageService.getUserId();
	  this.httpClient.post(`${this.API}/carritos/userandproduct`,{ usuarioid: userId, productoid: productoId})
	  .subscribe((res:any)=>{
		  if(!res.length){
			  this.httpClient.post(`${this.API}/carritos/add`,{ cantidad: 1, usuarioid: userId, productoid: productoId })
			  .subscribe((res)=>{
				  console.log(res);
			  },(err)=>{
				  console.log(err);
			  });
		  }else{
			  //logica para editar y sumarle uno
			  const carritoItem = res[0];
			  //console.log(carritoItem);
			  const nuevaCantidad = carritoItem.cantidad+1;
			  const nuevoItem = { cantidad : nuevaCantidad, usuarioid: carritoItem.usuarioid, productoid : carritoItem.productoid };
			  //putrequest
			  this.httpClient.put(`${this.API}/carritos/edit/${carritoItem.id}`, nuevoItem)
			  .subscribe((res) => {
				  console.log(res);
			  }, (err) => {
			  console.log(err)
			  });
		  }
	  },(err)=>{
		  console.log(err);
	  });
	  }else{
		  this.router.navigate(['/login']);
	  }

  }

}
