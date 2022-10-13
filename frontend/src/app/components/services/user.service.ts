import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



	API_URL="http://localhost:8080";
  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }


  public logear(loginData:any){
	  return this.httpClient.post(`${this.API_URL}/auth/logearse`,loginData);
  }
  
  public registrar(loginData:any){
	  return this.httpClient.post(`${this.API_URL}/auth/registrarse`,loginData);
  }

  public getCarrito(token:string){
	  return this.httpClient.get(`${this.API_URL}/content/forUser`, { headers: new HttpHeaders({'Authorization': token})}  );
  }

  public addItemCarrito(productoId:any):any{

	  if(this.localStorageService.isLogged()){
	  const userId = this.localStorageService.getUserId();
	  this.httpClient.post(`${this.API_URL}/carritos/userandproduct`,{ usuarioid: userId, productoid: productoId})
	  .subscribe((res:any)=>{
		  if(!res.length){
			  this.httpClient.post(`${this.API_URL}/carritos/add`,{ cantidad: 1, usuarioid: userId, productoid: productoId })
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

		  }
	  },(err)=>{
		  console.log(err);
	  });



	  }else{
		  this.router.navigate(['/login']);
	  }


  }
  
}
