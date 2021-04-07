import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/Modelo/docente';
import { DocenteService } from 'src/app/Service/docente.service';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { TokenService } from 'src/app/Service/token.service';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Router } from '@angular/router';
import { DocumentosDocenteService } from 'src/app/Service/documentos-docente.service';
import { Curso } from 'src/app/Modelo/curso';
import { Materia } from 'src/app/Modelo/materia';
import { TemaService } from '../Service/tema.service';

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
  asignacionDocente: AsignacionDocente = new AsignacionDocente();
  docente: Docente = new Docente();
  cursos: Curso[] = [];
  materias: Materia[] = [];
  roles: string[] = [];

  constructor(private tokenService: TokenService, private doceteService: DocenteService,
    private asignacionDocenteService: AsignacionDocenteService, private router: Router,
    private temaService: TemaService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsertName();
      this.roles = this.tokenService.getAuthorities();
      if(this.roles[0]=='ROLE_DOCENTE'){
        this.docenteInico();
      }
    }
  }

  docenteInico(){    
    this.doceteService.listar().subscribe(data => {
      data.forEach(profe => {
        if (profe.usuario.nombreUsuario == this.nombreUsuario) {
          this.docente = profe;
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
    this.materias = [];
    this.asignacionDocente.curso = curso;
    this.asignacionesDocente.forEach(asig => {      
      if (asig.curso.idCurso == curso.idCurso) {
        var flag: boolean = true;
        this.materias.forEach(materia => {
          if (asig.materia.idMateria == materia.idMateria) {
            flag = false;
          }
        });
        if (flag) {
          this.materias.push(asig.materia);
        }
      }      
    });
  }

  add(materia: Materia) {
    this.asignacionDocente.materia = materia;
    this.asignacionesDocente.forEach(element => {
      if (this.asignacionDocente.curso.idCurso == element.curso.idCurso && element.materia.idMateria == this.asignacionDocente.materia.idMateria) {        
        this.temaService.setIdCurso(element.curso.idCurso);
        this.temaService.setIdMateria(element.materia.idMateria);            
      }
    })

    this.router.navigate(["tema"]);
  }

  calendar(){
    this.router.navigate(["calendario"]);
  }
}
