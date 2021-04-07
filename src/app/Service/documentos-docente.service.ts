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
    console.log(documentosDocente)        
    return this.http.post<string[]>(this.url+"/registrar", documentosDocente);
  }

  
  public listar(id:string) {    
    return this.http.get<DocumentosDocente[]>(this.url+"/listar/".concat(id));
  }


  public consultar(id: string): Observable<DocumentosDocente>{    
    return this.http.get<DocumentosDocente>(this.url+"/consultar/".concat(id));
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

  getFiles(id: string): Observable<string[]> {
    return this.http.get<string[]>(this.url+"/files/".concat(id));
  }

  deleteFile(filename: string) {
    return this.http.get(`${this.url}/delete/${filename}`);
  }

  public setIdTema(idTema: number): void {
    window.localStorage.removeItem(TEMA_KEY);
    window.localStorage.setItem(TEMA_KEY, idTema.toString());
  }

  public getIdTema(): string {
    var a: any = localStorage.getItem(TEMA_KEY)
    return a;
  }
}
