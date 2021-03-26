import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from '../Modelo/docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  url: string = "";

  constructor(private http: HttpClient) { }

  public save (docente: Docente): Observable<string[]>{
    this.url = "http://localhost:8090/docente/registrar";
    return this.http.post<string[]>(this.url, docente);
  }

  public listar (){
    this.url = "http://localhost:8090/docente/listarDocentes";
    return this.http.get<Docente[]>(this.url);
  }

  getDocenteId(id:number){
    this.url = "http://localhost:8090/docente/consultar"
    return this.http.get<Docente>(this.url+"/"+id);
  }

  updateDocente(docente:Docente){
    this.url = "http://localhost:8090/docente"
    return this.http.put<Docente>(this.url+"/"+docente.idDocente, docente);
  }

  public consultar(id: string): Observable<Docente>{
    this.url = "http://localhost:8090/docente/consultar/".concat(id);
    return this.http.get<Docente>(this.url);
  }
}
