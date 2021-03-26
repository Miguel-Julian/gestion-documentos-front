import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Curso } from 'src/app/Modelo/curso';
import { Docente } from 'src/app/Modelo/docente';
import { Materia } from 'src/app/Modelo/materia';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { CursoService } from 'src/app/Service/curso.service';
import { DocenteService } from 'src/app/Service/docente.service';
import { MateriaService } from 'src/app/Service/materia.service';

@Component({
  selector: 'app-add-asig',
  templateUrl: './add-asig.component.html',
  styleUrls: ['./add-asig.component.css']
})
export class AddAsigComponent implements OnInit {

  asignacionDocente: AsignacionDocente = new AsignacionDocente();
  asignacionDocentes: AsignacionDocente[] = []
  hide: boolean = true;
  message: string = "";
  listaDocentes: Docente[] = [];
  listaCursos: Curso[] = [];
  listaMaterias: Materia[] = [];
  listaMaterias2: Materia[] = [];
  listaMaterias3: Materia[] = [];

  constructor(private router: Router, private service: AsignacionDocenteService,
    private cursoService: CursoService, private docenteService: DocenteService,
    private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.docenteService.listar().subscribe(res => { this.listaDocentes = res });
    this.cursoService.listar().subscribe(res => { this.listaCursos = res });
    this.materiaService.listar().subscribe(res => { this.listaMaterias = res });
    this.service.listar().subscribe(data => { this.asignacionDocentes = data; });
  }

  obtenerListaMateriasPorCurso(event: any): void {
    this.listaMaterias2 = [];
    this.listaMaterias3 = [];
    //guarda en listaMaterias2 los materias por docente ya asignadas
    this.asignacionDocentes.forEach(asignacionDocente => {
      if (this.asignacionDocente.curso.idCurso == asignacionDocente.curso.idCurso && asignacionDocente.materia.estado == true) {
        this.listaMaterias2.push(asignacionDocente.materia);
      }
    });
    //compara si la listaMaterias y listaMaterias2 son iguales; si no lo son guarda esa matteria en la listaMaterias3   
    var flag:boolean = true;
    this.listaMaterias.forEach(Materia1 => {
      flag = true;
      this.listaMaterias2.forEach(Materia2 => {
        if (Materia1.idMateria == Materia2.idMateria) {
            flag=false;
        }
      });
      if(flag){
        this.listaMaterias3.push(Materia1);
      }      
    });

  }

  getNombreDocente() {
    this.listaDocentes.forEach(Docente => {
      if (Docente.idDocente == this.asignacionDocente.docente.idDocente) {
        this.asignacionDocente.docente = Docente;
      }
    });
  }

  getNombreCurso() {
    this.listaCursos.forEach(Curso => {
      if (Curso.idCurso == this.asignacionDocente.curso.idCurso) {
        this.asignacionDocente.curso = Curso;
      }
    });
  }

  getNombreMateria() {
    this.listaMaterias.forEach(Materia => {
      if (Materia.idMateria == this.asignacionDocente.materia.idMateria) {
        this.asignacionDocente.materia = Materia;
      }
    });
  }

  Registrar() {
    this.getNombreDocente();
    this.getNombreCurso();
    this.getNombreMateria();
    this.service.save(this.asignacionDocente).subscribe(resultado => {
      console.log(resultado);

      //alert(resultado[0]);
      var nameError = document.getElementById("nombreError");
      if (nameError != undefined) {
        nameError.innerHTML = resultado[0];
      }
      if (resultado[0] == "Se ha asignado correctamente el curso y la materia") {
        this.hide = false;
        this.message = resultado[0];
        document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
        setTimeout(() => {
          this.router.navigate(["/listarAsignacionDocente"]);
        }, 2000);
      }
    });
  }

}
