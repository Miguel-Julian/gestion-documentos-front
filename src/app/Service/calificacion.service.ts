import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from '../Modelo/calificacion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private url: string = "";

  constructor(private http: HttpClient) { }

  public save (calificacion: Calificacion): Observable<string[]>{
    this.url = "http://localhost:8090/calificacion/registrar";
    return this.http.post<string[]>(this.url, calificacion);
  }

  public listar (){
    this.url = "http://localhost:8090/calificacion/listar";
    return this.http.get<Calificacion[]>(this.url);
  }

  getCalificacionId(id:number){
    this.url = "http://localhost:8090/calificacion/consultar"
    return this.http.get<Calificacion>(this.url+"/"+id);
  }

  updateCalificacion(calificacion:Calificacion){
    this.url = "http://localhost:8090/calificacion"
    return this.http.put<Calificacion>(this.url+"/"+calificacion.idCalificacion, calificacion);
  }

  public consultar(id: string): Observable<Calificacion>{
    this.url = "http://localhost:8090/calificacion/consultar/".concat(id);
    return this.http.get<Calificacion>(this.url);
  }
}
