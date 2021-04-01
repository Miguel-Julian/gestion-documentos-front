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

@Component({
  selector: 'app-listar-doc-docente',
  templateUrl: './listar-doc-docente.component.html',
  styleUrls: ['./listar-doc-docente.component.css']
})
export class ListarDocDocenteComponent implements OnInit {

  nombreUsuario: string = '';
  isLogged = false;
  asignacionesDocente: AsignacionDocente[] = [];
  asignacionDocente: AsignacionDocente = new AsignacionDocente();
  docente: Docente = new Docente();
  cursos: Curso[] = [];
  materias: Materia[] = [];

  constructor(private tokenService: TokenService, private doceteService: DocenteService,
    private asignacionDocenteService: AsignacionDocenteService, private router: Router,
    private documentosDocenteService: DocumentosDocenteService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsertName();
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
  }

  matetiasOfCurso(curso: Curso) {
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
      if (this.asignacionDocente == element) {
        this.documentosDocenteService.asignacionDocente = element;
      }
    })

    this.router.navigate(["addDocDocente"]);
  }
}
