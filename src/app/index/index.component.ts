import { Component, OnInit } from '@angular/core';
import { DocenteService } from 'src/app/Service/docente.service';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { TokenService } from 'src/app/Service/token.service';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelo/curso';
import { Materia } from 'src/app/Modelo/materia';
import { TemaService } from '../Service/tema.service';
import { EstudianteService } from '../Service/estudiante.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  imgInicio: string = 'assets/Bienvenida.jpg';
  nombreUsuario: string = '';
  isLogged = false;
  asignacionesDocente: AsignacionDocente[] = [];
  materias: Materia[] = [];
  curso: Curso = new Curso();
  cursos:Curso[]=[];
  roles: string[] = [];


  constructor(private tokenService: TokenService, private doceteService: DocenteService,
    private asignacionDocenteService: AsignacionDocenteService, private router: Router,
    private temaService: TemaService, private estudianteService: EstudianteService) { }

    ngOnInit(): void {
      if (this.tokenService.getToken()) {
        this.isLogged = true;
        this.nombreUsuario = this.tokenService.getUsertName();
        this.roles = this.tokenService.getAuthorities();
        if (this.roles[0] == 'ROLE_DOCENTE') {
          this.docenteInico();
        } else if (this.roles[0] == 'ROLE_ESTUDIANTE') {
          this.estudianteInico()
        }
      }
    }
    estudianteInico() {
      this.estudianteService.listar().subscribe(students => {
        students.forEach(student => {
          if (student.usuario.nombreUsuario == this.nombreUsuario) {
            this.asignacionDocenteService.listar().subscribe(res => {
              res.forEach(element => {
                if (student.curso.idCurso == element.curso.idCurso) {
                  this.asignacionesDocente.push(element);
                  this.temaService.setIdCurso(student.curso.idCurso);
                }
              });
            });
          }
        });
      });
    }
    docenteInico() {
      this.doceteService.listar().subscribe(data => {
        data.forEach(profe => {
          if (profe.usuario.nombreUsuario == this.nombreUsuario) {
            this.asignacionDocenteService.listarPorDocente(profe.idDocente).subscribe(res => {
              this.asignacionesDocente = res;
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
  
    materiasOfCurso(curso: Curso) {
      this.curso = curso;
      this.materias = [];
      this.asignacionesDocente.forEach(asig => {
        if (asig.curso.idCurso == curso.idCurso) {
          this.materias.push(asig.materia);
        }
      });
    }
    addDocente(materia: Materia) {
      this.temaService.setIdCurso(this.curso.idCurso);
      this.temaService.setIdMateria(materia.idMateria);
      this.router.navigate(["tema"]);
    }
  
    addEstudiante(asignacionDocente: AsignacionDocente) {
      this.temaService.setIdCurso(asignacionDocente.curso.idCurso);
      this.temaService.setIdMateria(asignacionDocente.materia.idMateria);
      this.router.navigate(["tema"]);
    }
  

  calendar(){
    this.router.navigate(["calendario"]);
  }
}
