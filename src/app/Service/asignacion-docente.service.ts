import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionDocente } from '../Modelo/asignacion-docente';

@Injectable({
  providedIn: 'root'
})
export class AsignacionDocenteService {

  private url: string = "";
  asignacionDocente: AsignacionDocente = new AsignacionDocente();

  constructor(private http: HttpClient) { }

  public save (asignacionDocente: AsignacionDocente): Observable<string[]>{
    this.url = "http://localhost:8090/asignacion/registrar";
    return this.http.post<string[]>(this.url, asignacionDocente);

    /*
    this.url = "http://localhost:8090/asignacion/registrar";
    return this.http.post<string[]>(this.url, asignacionDocente);
    */
  }

  public listar (){
    this.url = "http://localhost:8090/asignacion/listar";
    return this.http.get<AsignacionDocente[]>(this.url);
  }

  public listarPorDocente (id:number){
    this.url = "http://localhost:8090/asignacion/listarPorDocente";
    return this.http.get<AsignacionDocente[]>(this.url+"/"+id);
  }

  getAsignacionId(id:number){
    this.url = "http://localhost:8090/asignacion/consultar"
    return this.http.get<AsignacionDocente>(this.url+"/"+id);
  }

  updateAsignacion(asignacionDocente: AsignacionDocente){
    this.url = "http://localhost:8090/asignacion"
    return this.http.put<AsignacionDocente>(this.url+"/"+asignacionDocente.curso, asignacionDocente);
  }
/*
  public consultar(id: string): Observable<AsignacionDocente>{
    this.url = "http://localhost:8090/asignacion/consultar/".concat(id);
    return this.http.get<AsignacionDocente>(this.url);
  }
  */
}
