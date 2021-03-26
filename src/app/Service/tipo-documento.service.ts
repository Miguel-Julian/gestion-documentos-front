import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../Modelo/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  url: string = "";

  constructor(private http: HttpClient) { }

  public save (tipoDocumento: TipoDocumento): Observable<string[]>{
    this.url = "http://localhost:8090/tipoDocumento/registrar";
    return this.http.post<string[]>(this.url, tipoDocumento);
  }

  public listar (){
    this.url = "http://localhost:8090/tipoDocumento/listar";
    return this.http.get<TipoDocumento[]>(this.url);
  }

  public consultar(id: string): Observable<TipoDocumento>{
    this.url = "http://localhost:8090/tipoDocumento/consultar/".concat(id);
    return this.http.get<TipoDocumento>(this.url);
  }
}
