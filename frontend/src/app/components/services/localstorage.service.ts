import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /* este servicio se encarga de llamar a todas las funciones que
  interactuen con el localStorage del navegador */
  constructor() {}

  public setToken(input: string) {
    localStorage.setItem('token', input);
    /*va a setear el token al string
    en caso de que no este seteado */
  }

  public getToken(): any {
    return localStorage.getItem('token');
    /* va a devolver el token o undefined
    en caso de que no exista */
  }

  public setUserId(id: any) {
    return localStorage.setItem('userid', id);
    /*va a setear el id al valor
    que le pasemos a la funcion*/
  }

  public getUserId(): any {
    return localStorage.getItem('userid');
    /* va a devolver el id o undefined
    en caso de que no este seteado */
  }

  public clear() {
    localStorage.clear();
    // elimina todos los valores que hay en localStorage
  }

  public isLogged() {
    return localStorage.getItem('token') ? true : false;
    /* si el token devuelve algo que no sea undefined
    significa que estamos logeados por eso devuelve true
    sino devuelve false */
  }
}
