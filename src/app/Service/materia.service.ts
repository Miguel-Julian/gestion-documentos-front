import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../Modelo/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  url:string = "";

  constructor(private http: HttpClient) { }

  public save (materia:Materia): Observable<string[]>{
    this.url = "http://localhost:8090/materia/registrar";
    return this.http.post<string[]>(this.url, materia);
  }

  public listar (){
    this.url = "http://localhost:8090/materia/listar";
    return this.http.get<Materia[]>(this.url);
  }

  public consultar(id: string): Observable<Materia>{
    this.url = "http://localhost:8090/materia/consultar/".concat(id);
    return this.http.get<Materia>(this.url);
  }
}
