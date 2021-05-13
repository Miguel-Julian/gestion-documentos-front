import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosDocente } from '../Modelo/documentos-docente';
import { Tema } from '../Modelo/tema';
import { AsignacionDocenteService } from '../Service/asignacion-docente.service';
import { DocumentosDocenteService } from '../Service/documentos-docente.service';
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

  constructor(private tokenService: TokenService, private temaService: TemaService,
    private asignacionDocenteService: AsignacionDocenteService,
    private docDocenteService: DocumentosDocenteService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
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
}
