import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentosDocente } from 'src/app/Modelo/documentos-docente';
import { DocumentosDocenteService } from 'src/app/Service/documentos-docente.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-add-doc-docente',
  templateUrl: './add-doc-docente.component.html',
  styleUrls: ['./add-doc-docente.component.css']
})
export class AddDocDocenteComponent implements OnInit {

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  message2 = '';
  isLogged = false;
  fileInfos?: Observable<any>;
  documentosDocente: DocumentosDocente = new DocumentosDocente();
  

  constructor(private tokenService: TokenService,
     private documentosDocenteService: DocumentosDocenteService,
     private router:Router) { }

  ngOnInit(): void {
    this.fileInfos = this.documentosDocenteService.getFiles();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;    

  }

  Registrar(){
    this.documentosDocenteService.save(this.documentosDocente).subscribe(resultado=>{
      console.log(resultado);      
      var nameError = document.getElementById("nombreError");
      if(nameError != undefined){
        nameError.innerHTML = resultado[0];
      }
      if(resultado[0]=="Se ha guardado la Actividad"){        
        this.message2 = resultado[0];        
        setTimeout(()=>{          
          this.router.navigate(["/index"]);
        }, 2000);
      }
    });
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.documentosDocenteService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body;
              this.fileInfos = this.documentosDocenteService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error.text != null) {
              this.message = err.error.text;
            } else {
              this.message = err.error;
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }


  deleteFile(filename: string) {
    this.documentosDocenteService.deleteFile(filename).subscribe(res => {
      this.message = res.toString();
      this.fileInfos = this.documentosDocenteService.getFiles();
    });
  }
}
