import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /* este servicio se encarga de hacer las request relacionadas
  con la autenticacion */
  constructor(private httpClient: HttpClient) {}

  API = 'http://localhost:8080';

  /* devuelve una request por POST que envia en el body
  un objeto que recibe por parametro con usuario y contraseña */
  public logear(loginData: any) {
    return this.httpClient.post(`${this.API}/auth/logearse`, loginData);
  }

  /* devuelve una request por POST que envia en el body
  un objeto que recibe por parametro con usuario, nombrereal y contraseña */
  public registrar(loginData: any) {
    return this.httpClient.post(`${this.API}/auth/registrarse`, loginData);
  }

  /* devuelve una request por GET que envia en el header Authorization
  un token que recibe por parametro si es el token del admin el enviado dara true
  sino false */
  public isAdmin(token: any) {
    // si el token es null da error
    if (token == null) {
      token = '';
    }
    return this.httpClient.get(`${this.API}/auth/isAdmin`, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }
}
