import { Component, OnInit } from '@angular/core';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Curso } from 'src/app/Modelo/curso';
import { Docente } from 'src/app/Modelo/docente';
import { DocumentosDocente } from 'src/app/Modelo/documentos-docente';
import { DocumentosEstudiante } from 'src/app/Modelo/documentos-estudiante';
import { Estudiante } from 'src/app/Modelo/estudiante';
import { Materia } from 'src/app/Modelo/materia';
import { Tema } from 'src/app/Modelo/tema';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { DocenteService } from 'src/app/Service/docente.service';
import { DocumentosDocenteService } from 'src/app/Service/documentos-docente.service';
import { DocumentosEstudianteService } from 'src/app/Service/documentos-estudiante.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { MateriaService } from 'src/app/Service/materia.service';
import { TemaService } from 'src/app/Service/tema.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  isLogged = false;
  calificacion = false;
  nombreUsuario = '';
  asignacionDocentes: AsignacionDocente[] = []
  cursos: Curso[] = [];
  curso: Curso = new Curso();
  materias: Materia[] = [];
  materia: Materia = new Materia();
  docente: Docente = new Docente();
  listTemas: Tema[] = [];
  listDocDocente: DocumentosDocente[] = [];
  listDocStudents: DocumentosEstudiante[] = [];
  listaMaterias: Materia[] = [];
  listEstudiante: Estudiante[] = [];
  estudiantes: Estudiante[] = [];
  notaDefinitiva: number[] = [];

  constructor(private tokenService: TokenService, private temaService: TemaService,
    private doceteService: DocenteService, private asignacionDocenteService: AsignacionDocenteService,
    private docDocenteService: DocumentosDocenteService, private docStudentService: DocumentosEstudianteService,
    private service: AsignacionDocenteService, private materiaService: MateriaService,
    private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsertName();
      this.materiaService.listar().subscribe(res => { this.listaMaterias = res });
      this.service.listar().subscribe(data => { this.asignacionDocentes = data; });
      this.estudianteService.listar().subscribe(res => { this.listEstudiante = res });
      this.cargarCursos();
    }
  }

  cargarCursos() {
    this.doceteService.listar().subscribe(data => {
      data.forEach(profe => {
        if (profe.usuario.nombreUsuario == this.nombreUsuario) {
          this.docente = profe;
          this.asignacionDocenteService.listarPorDocente(profe.idDocente).subscribe(res => {
            res.forEach(element => {
              var flag: boolean = true;
              this.cursos.forEach(curso => {
                if (element.curso.idCurso == curso.idCurso) {
                  flag = false;
                }
              });
              if (flag) {
                this.cursos.push(element.curso);
              }
            });
          });
        }
      });
    });
  }

  obtenerListaMateriasPorCurso(event: any): void {
    this.materias = [];
    //guarda en listaMaterias2 los materias por docente ya asignadas
    this.asignacionDocentes.forEach(asignacionDocente => {
      if (this.curso.idCurso == asignacionDocente.curso.idCurso && asignacionDocente.materia.estado == true && this.docente.idDocente == asignacionDocente.docente.idDocente) {
        this.materias.push(asignacionDocente.materia);
      }
    });
  }
  setCursoAndMateria(event: any): void {
    this.temaService.setIdCurso(this.curso.idCurso);
    this.temaService.setIdMateria(this.materia.idMateria);
    this.loadMatriz()
    document.getElementById("botonMostrar")?.removeAttribute("disabled");
  }

  loadMatriz() {
    this.calificacion = true
    this.temaService.listar().subscribe(temas => {
      this.listTemas = temas;
      temas.forEach(tem => {
        this.docDocenteService.listar(tem.idTema.toString()).subscribe(docsDocente => {
          docsDocente.forEach(docDocente => {
            this.listDocDocente.push(docDocente);
            this.docStudentService.listar(docDocente.idDocumentosDocente.toString()).subscribe(docsEstu => {
              docsEstu.forEach(docStudiante => {
                this.listDocStudents.push(docStudiante);
                var flag = true;
                this.estudiantes.forEach(estu => {
                  if (docStudiante.estudiante.idEstudiante == estu.idEstudiante) {
                    flag = false;
                  }
                })
                if (flag) {     
                  this.estudiantes.push(docStudiante.estudiante);                     
                  this.docStudentService.notaDefinitiva(this.temaService.getIdCurso(),this.temaService.getIdMateria(),docStudiante.estudiante.idEstudiante.toString()).subscribe(nota=>{
                    this.notaDefinitiva.push(nota);                    
                  })                  
                }
              })
            });

          })
        });

      });
    });
  }

  quitarVacios() {
    var ths = document.getElementsByTagName("th")
    for (let i = 0; i < ths.length; i++) {
      if (ths[i].innerHTML.charAt(1) == '!') {
        var a = ths[i].parentNode;
        a?.removeChild(ths[i]);
        i = 0;
      }
    }
    var tds = document.getElementsByTagName("td")
    for (let i = 0; i < tds.length; i++) {
      if (tds[i].innerHTML.charAt(1) == '!') {
        var a = tds[i].parentNode;
        a?.removeChild(tds[i]);
        i = 0;
      }
    }
    document.getElementById("cali")?.setAttribute("style", "visibility: visible;");
    document.getElementById("descargar")?.setAttribute("style", "visibility: visible;");
  }

}
