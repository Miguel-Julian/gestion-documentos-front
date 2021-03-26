import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService {
  
  private url: string = "";

  constructor(private http: HttpClient) { }
  
   //Metodo que envia los archivos al endpoint /upload 
   upload(file: File, opcion:number): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
   if(opcion == 1){
      this.url ="http://localhost:8090/estudiante"
   }
   if(opcion == 2){
      this.url ="http://localhost:8090/docente"
   }
    const req = new HttpRequest('POST',`${this.url}/upload` , formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
