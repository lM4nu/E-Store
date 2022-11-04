import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  API = 'http://localhost:8080';

  public logear(loginData: any) {
    return this.httpClient.post(`${this.API}/auth/logearse`, loginData);
  }

  public registrar(loginData: any) {
    return this.httpClient.post(`${this.API}/auth/registrarse`, loginData);
  }

  public isAdmin(token: any) {
    if (token == null) {
      token = '';
    }
    return this.httpClient.get(`${this.API}/auth/isAdmin`, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }
}
