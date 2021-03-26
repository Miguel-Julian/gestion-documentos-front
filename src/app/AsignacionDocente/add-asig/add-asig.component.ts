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

  asignacionDocente: AsignacionDocente = new AsignacionDocente;
  hide: boolean = true;
  message: string = "";
  listaDocentes: Docente[]=[];
  listaCursos: Curso[]=[];
  listaMaterias: Materia[]=[];

  constructor(private router:Router, private service:AsignacionDocenteService, 
    private cursoService: CursoService, private docenteService:DocenteService,
    private materiaService: MateriaService) { }

  ngOnInit(): void {
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

  Registrar(){
    this.getNombreDocente(); 
    this.getNombreCurso();  
    this.getNombreMateria();      
    this.service.save(this.asignacionDocente).subscribe(resultado=>{
      console.log(resultado);
          
      //alert(resultado[0]);
      var nameError = document.getElementById("nombreError");
      if(nameError != undefined){
        nameError.innerHTML = resultado[0];
      }
      if(resultado[0]=="Se ha asignado correctamente el curso y la materia"){
        this.hide=false;
        this.message = resultado[0];
        document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
        setTimeout(()=>{          
          this.router.navigate(["/listarAsignacionDocente"]);
        }, 2000);
      }
    });
  }

}
