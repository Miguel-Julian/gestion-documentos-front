import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarComponent } from './Curso/listar/listar.component';
import { Calificacion } from './Modelo/calificacion';
import { Curso } from './Modelo/curso';
import { Docente } from './Modelo/docente';
import { Estudiante } from './Modelo/estudiante';
import { Materia } from './Modelo/materia';
import { CalificacionService } from './Service/calificacion.service';
import { CursoService } from './Service/curso.service';
import { DocenteService } from './Service/docente.service';
import { EstudianteService } from './Service/estudiante.service';
import { MateriaService } from './Service/materia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-documentos-front';
  cursos: Curso[] = [];
  curso: Curso = new Curso();
  materias:Materia[]=[];
  materia:Materia = new Materia();
  docentes:Docente[]=[];
  docente:Docente = new Docente();
  calificaciones: Calificacion[] = [];
  calificacion: Calificacion = new Calificacion();
  estudiantes: Estudiante[] = [];
  estudiante: Estudiante = new Estudiante();


  constructor(private router: Router, private cursoService: CursoService, 
    private materiaService: MateriaService, private docenteService: DocenteService,
    private calificacionService:CalificacionService, private estudianteService:EstudianteService){}

  ListarCursos(){
    this.cursoService.listar().subscribe(resultado => {
      this.cursos = resultado; //Almacena en la lista de personas lo que trae el resultado
    console.log(this.cursos);
    });
    this.router.navigate(["listarCursos"]);
  }

  ListarMaterias(){
    this.materiaService.listar().subscribe(resultado=>{
      this.materias = resultado;
      console.log(this.materias);
    });
    this.router.navigate(["listarMaterias"]);
  }

  ListarEstudiantes(){
    this.estudianteService.listar().subscribe(resultado=>{
      this.estudiantes = resultado;
      console.log(this.estudiantes);
    });
    this.router.navigate(["listarEstudiantes"]);
  }

  ListarDocentes(){
    this.docenteService.listar().subscribe(resultado=>{
      this.docentes = resultado;
      console.log(this.docente);
    });
    this.router.navigate(["listarDocentes"]);
  }

  ListarCalificaciones(){
    this.calificacionService.listar().subscribe(resultado=>{
      this.calificaciones = resultado;
      console.log(this.calificaciones);
    });
    this.router.navigate(["listarCalificaciones"]);
  }

  Import(){
    this.router.navigate(["import"]);
  }

}


