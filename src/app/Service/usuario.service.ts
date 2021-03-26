import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string="";

  constructor(private http:HttpClient) { }

  public save (usuario:Usuario):Observable<string[]>{
    this.url="http://localhost:8090/usuario/registrar";
    return this.http.post<string[]>(this.url, usuario);
  }

  public listar (){
    this.url="http://localhost:8090/usuario/listar";
    return this.http.get<Usuario[]>(this.url);
  }

  public consultar(id:string):Observable<Usuario>{
    this.url = "http://localhost:8090/usuario/consultar/".concat(id);
    return this.http.get<Usuario>(this.url);
  }
}
