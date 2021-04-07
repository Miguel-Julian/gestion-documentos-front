import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../Modelo/tema';

const CURSO_KEY = 'CURSO_KEY';
const MATERIA_KEY = 'MATERIA_KEY';

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

  public delete (tema:Tema): Observable<string[]>{
    this.url = "http://localhost:8090/tema/borrar";
    return this.http.post<string[]>(this.url, tema);
  }

  public listar (){        
    this.url = "http://localhost:8090/tema/listar/".concat(this.getIdCurso()).concat(",").concat(this.getIdMateria());
    return this.http.get<Tema[]>(this.url);
  }

  public listarFalse (){        
    this.url = "http://localhost:8090/tema/listarFalse/".concat(this.getIdCurso()).concat(",").concat(this.getIdMateria());
    return this.http.get<Tema[]>(this.url);
  }

  public consultar(id: string): Observable<Tema>{
    this.url = "http://localhost:8090/tema/consultar/".concat(id);
    return this.http.get<Tema>(this.url);
  }

  public setIdMateria(idMateria: number): void {
    window.localStorage.removeItem(MATERIA_KEY);
    window.localStorage.setItem(MATERIA_KEY, idMateria.toString());
  }

  public getIdMateria(): string {
    var a: any = localStorage.getItem(MATERIA_KEY)
    return a;
  }

  public setIdCurso(idCurso: number): void {
    window.localStorage.removeItem(CURSO_KEY);
    window.localStorage.setItem(CURSO_KEY, idCurso.toString());
  }

  public getIdCurso(): string {
    var a: any = localStorage.getItem(CURSO_KEY)
    return a;
  }

}
