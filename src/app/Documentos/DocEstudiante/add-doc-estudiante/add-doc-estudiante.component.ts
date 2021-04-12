import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentosDocenteService } from 'src/app/Service/documentos-docente.service';
import { DocumentosEstudianteService } from 'src/app/Service/documentos-estudiante.service';
import { TokenService } from 'src/app/Service/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosEstudiante } from 'src/app/Modelo/documentos-estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';

@Component({
  selector: 'app-add-doc-estudiante',
  templateUrl: './add-doc-estudiante.component.html',
  styleUrls: ['./add-doc-estudiante.component.css']
})
export class AddDocEstudianteComponent implements OnInit {

  isLogged = false;
  estadoEntrega: number = 3;
  documentoEstudiante: DocumentosEstudiante = new DocumentosEstudiante();
  URLFileDocente: string = '';
  URLFileEstudiante: string = '';
  nombreArchivoUrlDocente: string = '';
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  nombreArchivo: string = '';
  hide: boolean = true;
  tiempoRestante: String = '';
  mens: string[] = ['', 'Sin Calificar', 'No Entregado', '', 'Sin Comentarios', ''];
  isEnviar: boolean = true;
  isCambio: boolean = true;

  constructor(private tokenService: TokenService, private documentosDocenteService: DocumentosDocenteService,
    private documentosEstudianteService: DocumentosEstudianteService, private estudianteService: EstudianteService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.cargarDatosDocEstudianteForSave()
    } else {
      this.isLogged = false;
    }
  }


  cargarDatosDocEstudianteForSave() {
    console.log
    let idDocDocente: any = localStorage.getItem("idDocDocente");
    if (idDocDocente != undefined) {
      this.documentosDocenteService.consultar(idDocDocente).subscribe(data => {
        this.estadoEntrega = this.estadoEntregaComparacion(data.fechaLimite, new Date())
        if (this.estadoEntrega == 0) {
          this.mens[3] = "La Tarea está retrasada por: " + this.diferenciaFechas(data.fechaLimite, new Date());
          this.isEnviar = false;
          this.isCambio = false;
        } else if (this.estadoEntrega == 1) {
          this.mens[3] = this.diferenciaFechas(data.fechaLimite, new Date());
        }
        this.documentoEstudiante.documentosDocente = data;
        this.documentoEstudiante.rutaArchivo = data.rutaArchivo + "Archivos Estudiantes/";
        this.documentosDocenteService.getFiles(data.idDocumentosDocente.toString()).subscribe(rut => {
          if (rut.length != 0) {
            this.URLFileDocente = rut[0];
            this.mens[0] = this.documentoEstudiante.documentosDocente.nombreArchivo;
          }
        });
      });
    }

    this.estudianteService.listar().subscribe(students => {
      students.forEach(student => {
        if (student.usuario.nombreUsuario == this.tokenService.getUsertName()) {
          this.documentoEstudiante.estudiante = student;
          this.documentosEstudianteService.consultar(idDocDocente, student.idEstudiante.toString()).subscribe(docEstu => {
            if (docEstu != null) {///verifica si el estudiante ya hizo alguna entrega
              this.documentoEstudiante = docEstu;
              if (docEstu.nota != 0.0) {
                this.mens[1] = docEstu.nota + "";
              }
              var fechaEntrega: Date = new Date(docEstu.fechaEntrega.toString());
              this.mens[2] = this.fecha(fechaEntrega);
              this.estadoEntrega = 2;
              if (this.estadoEntregaComparacion(docEstu.documentosDocente.fechaLimite, fechaEntrega) == 0) {
                this.isEnviar = false;
              }
              this.mens[3] = "La Tarea fue entregada con: " + this.diferenciaFechas(docEstu.documentosDocente.fechaLimite, fechaEntrega) + " Restantes";
              if (docEstu.comentario != '') {
                this.mens[4] = docEstu.comentario;
              }
              this.documentosEstudianteService.getFiles(idDocDocente, docEstu.estudiante.idEstudiante.toString()).subscribe(urlFiles => {
                urlFiles.forEach(urlFile => {
                  var leng = urlFile.split("/").length;
                  var nombreArchivo = urlFile.split("/")[leng - 1]
                  if (nombreArchivo == docEstu.nombreArchivo) {
                    this.mens[5] = docEstu.nombreArchivo;
                    this.URLFileEstudiante = urlFile;
                  }
                });
              });
              this.isEnviar = false;
              console.log(docEstu)
            }
          });
        }
      });
    })
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  cambiarArchivo() {
    this.isEnviar = true;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.documentosEstudianteService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            this.message = err.error.text;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
      var a: string[] = this.nombreArchivo.split("\\");
      this.documentoEstudiante.nombreArchivo = a[a.length - 1];
      this.documentoEstudiante.fechaEntrega = new Date();
      this.documentosEstudianteService.save(this.documentoEstudiante).subscribe(mesa => {
        console.log(mesa);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      });
    }
  }

  mes(mes: number) {
    var mesNombre: string = '';
    if (mes == 0) { mesNombre = "Enero"; }
    else if (mes == 1) { mesNombre = "Febrero"; }
    else if (mes == 2) { mesNombre = "Marzo"; }
    else if (mes == 3) { mesNombre = "Abril"; }
    else if (mes == 4) { mesNombre = "Mayo"; }
    else if (mes == 5) { mesNombre = "Junio"; }
    else if (mes == 6) { mesNombre = "Julio"; }
    else if (mes == 7) { mesNombre = "Agosto"; }
    else if (mes == 8) { mesNombre = "Septiembre"; }
    else if (mes == 9) { mesNombre = "Octubre"; }
    else if (mes == 10) { mesNombre = "Noviembre"; }
    else { mesNombre = "Diciembre"; }
    return mesNombre;
  }
  dia(dia: number) {
    var diaNombre: string = '';
    if (dia == 0) { diaNombre = "Domingo"; }
    else if (dia == 1) { diaNombre = "Lunes"; }
    else if (dia == 2) { diaNombre = "Martes"; }
    else if (dia == 3) { diaNombre = "Miercoles"; }
    else if (dia == 4) { diaNombre = "Jueves"; }
    else if (dia == 5) { diaNombre = "Viernes"; }
    else { diaNombre = "Sabado"; }
    return diaNombre;
  }

  fecha(fecha: Date) {
    var hora: string = fecha.getHours() + "";
    var minutos: string = fecha.getMinutes() + "";
    var seg: string = fecha.getSeconds() + "";
    console.log(hora + minutos + seg)
    if (Number(hora) < 10) { hora = "0" + fecha.getHours() }
    if (Number(minutos) < 10) { minutos = "0" + fecha.getMinutes() }
    if (Number(seg) < 10) { seg = "0" + fecha.getSeconds() }
    console.log(hora + minutos + seg)
    return this.dia(fecha.getDay()) + ", " + fecha.getDate() + " de " + this.mes(fecha.getMonth()) + " de " + fecha.getFullYear() + ", " + hora + ":" + minutos + ":" + seg;
  }

  diferenciaFechas(limite3: Date, actual: Date) {
    var dia: number = 24 * 3600 * 1000;
    var hora: number = 3600 * 1000;
    var min: number = 60 * 1000;

    var fechaActual: Date = new Date(actual.toString());
    var fechaLimite: Date = new Date(limite3.toString());
    var diferencia: number = (fechaActual.getTime() - fechaLimite.getTime());


    var diaDif: number[] = [Number(((diferencia / dia) + "").split(".")[0]), Number("0." + ((diferencia / dia) + "").split(".")[1])]
    var horaDif: number[] = [Number((((diaDif[1] * dia) / hora) + "").split(".")[0]), Number("0." + (((diaDif[1] * dia) / hora) + "").split(".")[1])];
    var minDif: number[] = [Number((((horaDif[1] * hora) / min) + "").split(".")[0]), Number("0." + (((horaDif[1] * hora) / min) + "").split(".")[1])];
    return diaDif[0] + " Dias, " + horaDif[0] + " Horas, " + minDif[0] + " Minutos"
  }

  estadoEntregaComparacion(limite3: Date, fecha: Date) {
    var fecha: Date = new Date(fecha.toString());
    var fechaLimite: Date = new Date(limite3.toString());
    if (fecha.getTime() > fechaLimite.getTime()) {
      return 0;
    } else {
      return 1;
    }
  }
}
