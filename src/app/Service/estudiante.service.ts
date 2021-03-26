import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../Modelo/estudiante';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private url: string = "";

  constructor(private http: HttpClient) { }

  public save (estudiante: Estudiante): Observable<string[]>{
    this.url = "http://localhost:8090/estudiante/registrar";
    return this.http.post<string[]>(this.url, estudiante);
  }

  public listar (){
    this.url = "http://localhost:8090/estudiante/listar";
    return this.http.get<Estudiante[]>(this.url);
  }

  getEstudianteId(id:number){
    this.url = "http://localhost:8090/estudiante/consultar"
    return this.http.get<Estudiante>(this.url+"/"+id);
  }

  updateEstudiante(estudiante:Estudiante){
    this.url = "http://localhost:8090/estudiante"
    return this.http.put<Estudiante>(this.url+"/"+estudiante.idEstudiante, estudiante);
  }

  public consultar(id: string): Observable<Estudiante>{
    this.url = "http://localhost:8090/estudiante/consultar/".concat(id);
    return this.http.get<Estudiante>(this.url);
  }
}
