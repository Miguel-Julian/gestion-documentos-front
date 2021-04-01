import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsignacionDocente } from '../Modelo/asignacion-docente';
import { DocumentosDocente } from '../Modelo/documentos-docente';

@Injectable({
  providedIn: 'root'
})
export class DocumentosDocenteService {

  private url: string = "http://localhost:8090/documentosDocente";
  asignacionDocente: AsignacionDocente = new AsignacionDocente();

  constructor(private http: HttpClient) { }

  public save (documentosDocente: DocumentosDocente): Observable<string[]>{   
    return this.http.post<string[]>(`${this.url}/registrar`, documentosDocente);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(){
    return this.http.get(`${this.url}/files`);
  }
  deleteFile(filename: string){
    return this.http.get(`${this.url}/delete/${filename}`);
  }
}
