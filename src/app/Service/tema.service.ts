import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../Modelo/tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  url:string = "";

  constructor(private http: HttpClient) { }

  public save (tema:Tema): Observable<string[]>{
    this.url = "http://localhost:8090/tema/registrar";
    return this.http.post<string[]>(this.url, tema);
  }

  public listar (){
    this.url = "http://localhost:8090/tema/listar";
    return this.http.get<Tema[]>(this.url);
  }

  public consultar(id: string): Observable<Tema>{
    this.url = "http://localhost:8090/tema/consultar/".concat(id);
    return this.http.get<Tema>(this.url);
  }
}
