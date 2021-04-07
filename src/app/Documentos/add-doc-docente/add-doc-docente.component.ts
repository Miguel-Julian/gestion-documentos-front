import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosDocente } from 'src/app/Modelo/documentos-docente';
import { CalificacionService } from 'src/app/Service/calificacion.service';
import { CursoService } from 'src/app/Service/curso.service';
import { DocumentosDocenteService } from 'src/app/Service/documentos-docente.service';
import { MateriaService } from 'src/app/Service/materia.service';
import { TemaService } from 'src/app/Service/tema.service';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
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
  URLFile: string[] = [];
  editarArchivo: boolean = true;
  isLogged = false;
  flag: boolean = true;
  isEditar:boolean = false;
  nombreArchivo: string = '';
  documentoDocente: DocumentosDocente = new DocumentosDocente();
  hide: boolean = true;
  rutaImcompleta: string = '';
  cargar:boolean = false;
  datos:string[] = [];

  constructor(private tokenService: TokenService, private temaService: TemaService,
    private calificacionService: CalificacionService, private cursoservice: CursoService,
    private materiaService: MateriaService,
    private documentosDocenteService: DocumentosDocenteService, private modalService: NgbModal) { }

  ngOnInit(): void {    
    this.Editar()
    if (this.tokenService.getToken()) {
      this.cargatDatos()
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  cargatDatos() {
    this.cursoservice.consultar(this.temaService.getIdCurso()).subscribe(curso => {
      this.materiaService.consultar(this.temaService.getIdMateria()).subscribe(mater => {
        this.temaService.consultar(this.documentosDocenteService.getIdTema()).subscribe(tem => {
          this.documentoDocente.tema = tem;                 
          if (this.isEditar == false) {
            this.documentosDocenteService.listar(this.documentosDocenteService.getIdTema()).subscribe(list => {
              var b: number = list.length;
              if (b == 0) {
                b = 1;
              } else {
                b = (list[list.length - 1].idDocumentosDocente) + 1;
              }
              this.rutaImcompleta = curso.nombreCurso + "/" + mater.nombreMateria + "/" + tem.nombreTema + "/" + "-" + b + "-";
            });                        
          }else{
            var a: number = this.documentoDocente.idDocumentosDocente;
            this.rutaImcompleta = curso.nombreCurso + "/" + mater.nombreMateria + "/" + tem.nombreTema + "/" + "-" + a + "-";
          }          
        });
      });
    });
    this.calificacionService.listar().subscribe(cals => {
      cals.forEach(cal => {
        if (cal.sel == true) {
          this.documentoDocente.calificacion = cal;
        }
      });
    });
  }

  Registrar(content:any) {    
    if(this.editarArchivo){      
      if (this.nombreArchivo != '') {
        this.upload();              
        var a: string[] = this.nombreArchivo.split("\\");
        this.documentoDocente.nombreArchivo = a[a.length - 1];
      } else {
        this.documentoDocente.nombreArchivo = '';
        this.documentoDocente.rutaArchivo = '';
      }
    }
    this.documentoDocente.rutaArchivo = this.rutaImcompleta + this.documentoDocente.nombreActividad + "/";
    this.flag = false;
    this.documentoDocente.fechaInicio = new Date((document.getElementById("fechaInicio") as HTMLInputElement).value)
    this.documentoDocente.fechaLimite = new Date((document.getElementById("fechaLimite") as HTMLInputElement).value)    
    setTimeout(() => {
      if(this.cargar && this.isEditar){
        this.documentoDocente.tema.nombreTema = "";        
      }  
      this.documentosDocenteService.save(this.documentoDocente).subscribe(resultado => {
        console.log(resultado);
        this.datos =  resultado;
      });
    }, 2000);
    
    this.modalService.open(content);

  }

  Editar() {    
    let id = localStorage.getItem("idDocDocente");
    if (id != undefined) {      
      this.documentosDocenteService.consultar(id).subscribe(data => {
        this.documentoDocente = data;
        if(data.nombreArchivo != ""){   
          this.editarArchivo = false;       
        }              
        this.documentosDocenteService.getFiles(data.idDocumentosDocente.toString()).subscribe(rut =>{
          this.URLFile = rut;
        });
      });
      this.isEditar = true;
      
    }
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
            }
            this.cargar = true;
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


  editArchivo(){
    if(this.editarArchivo == true){
      this.editarArchivo = false;
    }else{
      this.editarArchivo = true;
    }
  }
}
