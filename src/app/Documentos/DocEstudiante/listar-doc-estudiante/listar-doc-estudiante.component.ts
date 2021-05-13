import { Component, OnInit } from '@angular/core';
import { DocumentosEstudiante } from 'src/app/Modelo/documentos-estudiante';
import { DocumentosEstudianteService } from 'src/app/Service/documentos-estudiante.service';
import { TokenService } from 'src/app/Service/token.service';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-doc-estudiante',
  templateUrl: './listar-doc-estudiante.component.html',
  styleUrls: ['./listar-doc-estudiante.component.css']
})
export class ListarDocEstudianteComponent implements OnInit {

  isLogged = false;
  isSele= false;
  documentosEstudiante: DocumentosEstudiante[] = [];
  documentoEstudiante: DocumentosEstudiante = new DocumentosEstudiante();
  URLFileEstudiante:string = '';
  message:any = '';
  noEnvio = false;

  constructor(private tokenService: TokenService, private docEstudianteService: DocumentosEstudianteService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.cargarDatos()
    } else {
      this.isLogged = false;
    }
  }

  cargarDatos() {
    let idDocDocente: any = localStorage.getItem("idDocDocente");
    if (idDocDocente != undefined) {
      this.docEstudianteService.listar(idDocDocente).subscribe(listDoc =>{     
        this.documentosEstudiante = listDoc;
      });
    }
  }

  calificar(docEstudiante:DocumentosEstudiante){    
    this.URLFileEstudiante = '';
    this.noEnvio = false;
    
    if(docEstudiante.nombreArchivo != null){      
      this.docEstudianteService.getFiles(docEstudiante.documentosDocente.idDocumentosDocente.toString(), docEstudiante.estudiante.idEstudiante.toString()).subscribe(urlFiles => {        
        console.log(urlFiles)    
        urlFiles.forEach(urlFile => {
          var leng = urlFile.split("/").length;
          var nombreArchivo = urlFile.split("/")[leng - 1]   
          console.log("asldñfasd")      
          if (nombreArchivo == docEstudiante.nombreArchivo) {          
            this.URLFileEstudiante = urlFile;
            
          }
        });
      });
    }else{
      this.noEnvio = true;
    }
    this.isSele = true;
    this.documentoEstudiante = docEstudiante;
  }

  Registrar(content:any){    
    this.message = '';
    if(this.documentoEstudiante.nota>= this.documentoEstudiante.documentosDocente.calificacion.notaMinima &&this.documentoEstudiante.nota<= this.documentoEstudiante.documentosDocente.calificacion.notaMaxima){
      this.documentoEstudiante.estado = true;
      if(this.documentoEstudiante.rutaArchivo == null){
        this.documentoEstudiante.rutaArchivo = 'sss';
      }      
      this.docEstudianteService.save(this.documentoEstudiante).subscribe(data=>{
        console.log(data);
        if(data[0] == 'Se ha asignado correctamente el Estudiante y la Actividad'){
          this.message = 'Calificacion Exitosa'
        }else{
          this.message = data
        }
        
      })
    }else{
      this.message = "Calificacion Invalida"+"\nNota Minima: "+this.documentoEstudiante.documentosDocente.calificacion.notaMinima+",0\nNotaMaxima: "+this.documentoEstudiante.documentosDocente.calificacion.notaMaxima+",0"
    }
    this.modalService.open(content);
  }
}
