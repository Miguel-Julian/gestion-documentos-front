import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from '../Modelo/curso';
import { DocumentosDocente } from '../Modelo/documentos-docente';
import { Materia } from '../Modelo/materia';
import { Tema } from '../Modelo/tema';
import { AsignacionDocenteService } from '../Service/asignacion-docente.service';
import { CursoService } from '../Service/curso.service';
import { DocumentosDocenteService } from '../Service/documentos-docente.service';
import { MateriaService } from '../Service/materia.service';
import { TemaService } from '../Service/tema.service';
import { TokenService } from '../Service/token.service';


@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})

export class TemaComponent implements OnInit {

  isDocente?: boolean;
  editar: boolean = false;
  isLogged = false;
  roles: string[] = [];
  temas: Tema[] = [];
  temasInactivos: Tema[] = [];
  temasAll: Tema[] = [];
  tema1: Tema = new Tema();
  selectTema: boolean = false;
  documentosDocenteActivos: DocumentosDocente[] = [];
  documentosDocenteInactivos: DocumentosDocente[] = [];
  materia:Materia = new Materia();
  curso:Curso = new Curso();

  constructor(private tokenService: TokenService, private temaService: TemaService,
    private asignacionDocenteService: AsignacionDocenteService, private materiaService: MateriaService,
    private docDocenteService: DocumentosDocenteService, private router: Router,
    private cursoService:CursoService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
      this.materiaService.consultar(this.temaService.getIdMateria()).subscribe(mat =>{
        this.materia = mat;
      });
      this.cursoService.consultar(this.temaService.getIdCurso()).subscribe(cur =>{
        this.curso = cur;
      });
      if (this.roles[0] == 'ROLE_DOCENTE') {
        this.isDocente = true;
      } else if (this.roles[0] == 'ROLE_ESTUDIANTE') {
        this.isDocente = false;
      }
      this.cargarListas();
    }
  }


  cargarListas() {
    this.temaService.listar().subscribe(temas => {
      this.temas = temas;
      temas.forEach(tem => {
        this.temasAll.push(tem);
        this.docDocenteService.listar(tem.idTema.toString()).subscribe(docs => {
          docs.forEach(doc => {
            var fecha:Date = new Date(doc.fechaLimite)
            doc.descripcionActividad = this.fecha(fecha);
            if (doc.estado) {              
              this.documentosDocenteActivos.push(doc);
            } else {
              this.documentosDocenteInactivos.push(doc);
            }
          });
        });
      });
    });

    if (this.isDocente) {
      this.temaService.listarFalse().subscribe(temasInactivos => {
        this.temasInactivos = temasInactivos;
        temasInactivos.forEach(temIn => {
          this.temasAll.push(temIn);
          this.docDocenteService.listar(temIn.idTema.toString()).subscribe(docs => {
            docs.forEach(doc => {
              var fecha:Date = new Date(doc.fechaLimite)
              doc.descripcionActividad = this.fecha(fecha);
              if (doc.estado) {
                this.documentosDocenteActivos.push(doc);
              } else {
                this.documentosDocenteInactivos.push(doc);
              }
            });
          });
        });
      });
    }
  }

  //cambia pa pestaña de temas
  cambio(id: number) {
    this.temasAll.forEach(tem => {
      document.getElementById("tab_" + tem.idTema)?.setAttribute("class", "nav-link");
      document.getElementById("tab" + tem.idTema)?.setAttribute("aria-selected", "false");
      document.getElementById(tem.idTema.toString())?.setAttribute("class", "tab-pane fade");
      if (tem.idTema == Number(id)) {
        this.docDocenteService.setIdTema(Number(id));
      }
    });
    document.getElementById("tab_" + id)?.setAttribute("class", "nav-link active");
    document.getElementById("tab_" + id + "")?.setAttribute("aria-selected", "true");
    document.getElementById(id.toString())?.setAttribute("class", "tab-pane fade show active");

    this.selectTema = true;

  }

  accion(id: number):void{
    localStorage.setItem("idDocDocente", id.toString());
    if(this.isDocente){
      this.router.navigate(["listarDocEstudiante"]);
    }else{      
      this.router.navigate(["addDocEstudiante"]);
    }    
  }

  deleteDocDocente(documentoDocente: DocumentosDocente) {
    if (confirm("¿Seguro que desesa eliminar la Actividad "+documentoDocente.nombreActividad+"?")) {
      this.docDocenteService.delete(documentoDocente).subscribe(res => {
        console.log(res)
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }
  enviarId(id: number): void {
    localStorage.setItem("idDocDocente", id.toString());
  }
  deleteTema(tema: Tema) {
    if (confirm("¿Seguro que desesa eliminar el Tema, Se eliminaran todos las actividades de ese tema?")) {
      this.temaService.delete(tema).subscribe(res => {
        console.log(res)
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  saveTema() {
    ///guarda un nuevo tema
    if (document.getElementById("nuevoNombre") != undefined) {
      var nomb: any = ((document.getElementById("nuevoNombre") as HTMLInputElement).value);
    }
    if (nomb != undefined && nomb != '') {
      this.tema1.nombreTema = nomb;
      this.asignacionDocenteService.consultar(this.temaService.getIdCurso(), this.temaService.getIdMateria()).subscribe(asig => {
        this.tema1.asignacionDocente = asig;
        this.tema1.estado = true;
        this.temaService.save(this.tema1).subscribe(res => {
          console.log(res)
        });
      });
    }
    //Actualiza los temas
    console.log("asfasdf")
    this.temasAll.forEach(data => {
      var nomb: any = document.getElementById("nombreCaja_" + data.idTema)?.innerHTML.toString();
      data.nombreTema = nomb;
      this.temaService.save(data).subscribe(res => {
        console.log(res)
      });
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  inactivarActivarTema(tema: Tema) {
    if (tema.estado == false) {
      tema.estado = true;
    } else {
      tema.estado = false;
    }
    this.temaService.save(tema).subscribe(res => {
      console.log(res)
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  agregarCampo() {
    var padre = document.getElementById("agregarAqui");
    document.getElementById("+")?.remove();
    var input = document.createElement("input");
    input.setAttribute("id", "nuevoNombre");
    input.setAttribute("type", "text");
    input.setAttribute("_ngcontent-xkw-c125", "");
    //aquí indicamos que es un input de tipo text    
    padre?.appendChild(input);
  }

  editarButton() {
    if (this.editar == true) {
      this.editar = false;
    } else {
      this.editar = true;
    }
  }

  inactivarActivarDocDocente(documentoDocente: DocumentosDocente) {
    if (documentoDocente.estado == false) {
      documentoDocente.estado = true;
    } else {
      documentoDocente.estado = false;
    }
    this.docDocenteService.save(documentoDocente).subscribe(res => {
      console.log(res)
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  agregarDocDocente(): void {
    window.localStorage.removeItem("idDocDocente");
    this.router.navigate(["addDocDocente"]);
  }

  EditarDocDocente(id: number): void {
    localStorage.setItem("idDocDocente", id.toString());
    this.router.navigate(["addDocDocente"]);
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

  fecha(fecha: Date):string {
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
}
