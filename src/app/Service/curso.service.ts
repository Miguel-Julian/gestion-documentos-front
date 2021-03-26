import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../Modelo/curso';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private url: string = "";

  constructor(private http: HttpClient) { }

  public save (curso: Curso): Observable<string[]>{
    this.url = "http://localhost:8090/curso/registrar";
    return this.http.post<string[]>(this.url, curso);
  }

  public listar (){
    this.url = "http://localhost:8090/curso/listar";
    return this.http.get<Curso[]>(this.url);
  }

  getCursosId(id:number){
    this.url = "http://localhost:8090/curso/consultar"
    return this.http.get<Curso>(this.url+"/"+id);
  }

  updateCurso(curso:Curso){
    this.url = "http://localhost:8090/curso"
    return this.http.put<Curso>(this.url+"/"+curso.idCurso, curso);
  }

  public consultar(id: string): Observable<Curso>{
    this.url = "http://localhost:8090/curso/consultar/".concat(id);
    return this.http.get<Curso>(this.url);
  }
}
