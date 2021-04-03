import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentosDocente } from '../Modelo/documentos-docente';

const TEMA_KEY = 'TEMA_KEY';

@Injectable({
  providedIn: 'root'
})
export class DocumentosDocenteService {

  private url: string = "http://localhost:8090/documentosDocente";  

  constructor(private http: HttpClient) { }

  public save(documentosDocente: DocumentosDocente): Observable<string[]> {
    return this.http.post<string[]>(`${this.url}/registrar`, documentosDocente);
  }

  public listar() {
    this.url = "http://localhost:8090/tema/listar/".concat(this.getIdTema());
    return this.http.get<DocumentosDocente[]>(this.url);
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

  getFiles() {
    return this.http.get(`${this.url}/files`);
  }

  deleteFile(filename: string) {
    return this.http.get(`${this.url}/delete/${filename}`);
  }

  public setIdTema(idTema: number): void {
    window.sessionStorage.removeItem(TEMA_KEY);
    window.sessionStorage.setItem(TEMA_KEY, idTema.toString());
  }

  public getIdTema(): string {
    var a: any = sessionStorage.getItem(TEMA_KEY)
    return a;
  }
}
