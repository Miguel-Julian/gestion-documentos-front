import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../Modelo/jwt';
import { Usuario } from '../Modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL = 'http://localhost:8090/usuario/';
  constructor(private httpCient:HttpClient) { }

  public login(loginUsuario:  Usuario):Observable<Jwt>{
    return this.httpCient.post<Jwt>(this.authURL + 'login', loginUsuario)
  }
}
