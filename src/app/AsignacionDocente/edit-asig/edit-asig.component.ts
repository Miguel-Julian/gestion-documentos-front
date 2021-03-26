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
  selector: 'app-edit-asig',
  templateUrl: './edit-asig.component.html',
  styleUrls: ['./edit-asig.component.css']
})
export class EditAsigComponent implements OnInit {

  asignacionDocente: AsignacionDocente = new AsignacionDocente();
  listaDocentes: Docente[]=[];
  listaCursos: Curso[]=[];
  listaMaterias: Materia[]=[];

  constructor(private router:Router, private service:AsignacionDocenteService, 
    private docenteService: DocenteService, private cursoService:CursoService,
    private materiaService:MateriaService) { }

  ngOnInit(): void {
    this.Editar();
    this.docenteService.listar().subscribe(res=>{this.listaDocentes=res});
    this.cursoService.listar().subscribe(res=>{this.listaCursos=res});
    this.materiaService.listar().subscribe(res=>{this.listaMaterias=res});    
  }

  getNombreDocente() {    
    this.listaDocentes.forEach(Docente => {
      if (Docente.idDocente==this.asignacionDocente.docente.idDocente){                
        this.asignacionDocente.docente = Docente;        
      }
    });    
  }

  getNombreCurso() {    
    this.listaCursos.forEach(Curso => {
      if (Curso.idCurso==this.asignacionDocente.curso.idCurso){                
        this.asignacionDocente.curso = Curso;        
      }
    });    
  }

  getNombreMateria() {    
    this.listaMaterias.forEach(Materia => {
      if (Materia.idMateria==this.asignacionDocente.materia.idMateria){                
        this.asignacionDocente.materia = Materia;        
      }
    });    
  }

  Editar() {    
    this.asignacionDocente = this.service.asignacionDocente;
  }

  Actualizar(asignacionDocente:AsignacionDocente) {
    this.getNombreCurso();
    this.service.save(asignacionDocente).subscribe(data => {
      //this.estudiante = data[0];
      alert(data[0]);
      this.router.navigate(["/listarAsignacionDocente"]);
    });
  }


}
