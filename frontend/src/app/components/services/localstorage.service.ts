import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setToken(input:string){
	  localStorage.setItem("token",input);
  }

  public getToken():any {
	  return localStorage.getItem("token");
  }

  public setUserId(id:any){
	  return localStorage.setItem("userid",id);
  }

  public getUserId():any{
	  return localStorage.getItem("userid");
  }

  public clear(){
	  localStorage.clear();
  }

  public isLogged(){
	  return localStorage.getItem("token") ? true : false;
  }

}
