import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentosEstudiante } from '../Modelo/documentos-estudiante';


@Injectable({
  providedIn: 'root'
})
export class DocumentosEstudianteService {

  private url: string = "http://localhost:8090/documentosEstudiante";  

  constructor(private http: HttpClient) { }

  public save(documentosEstudiante: DocumentosEstudiante): Observable<string[]> {
    console.log(documentosEstudiante)        
    return this.http.post<string[]>(this.url+"/registrar", documentosEstudiante);
  }

  public delete (documentosDocente:DocumentosEstudiante): Observable<string[]>{    
    return this.http.post<string[]>(this.url+"/borrar", documentosDocente);
  }
  
  public listar(id:string) {    
    return this.http.get<DocumentosEstudiante[]>(this.url+"/listar/".concat(id));
  }

  public consultar(idDocDocente: string,idEstudiante:string): Observable<DocumentosEstudiante>{    
    return this.http.get<DocumentosEstudiante>(this.url+"/consultar/".concat(idDocDocente).concat(",").concat(idEstudiante));
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

  getFiles(idDocDocente: string,idEstudiante:string): Observable<string[]> {
    return this.http.get<string[]>(this.url+"/files/".concat(idDocDocente).concat(",").concat(idEstudiante));
  }

  deleteFile(filename: string) {
    return this.http.get(`${this.url}/delete/${filename}`);
  }
}
