import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelo/curso';
import { CursoService } from 'src/app/Service/curso.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  cursos: Curso[];
  pageActual: number = 1;

  constructor(private service:CursoService, private router: Router) { 
    this.cursos = [];
  }

  ngOnInit(): void {
    this.service.listar().subscribe(data =>{
      this.cursos=data;
    });
  }

  RegistrarCursos(){
    this.router.navigate(["addCurso"]);
  }

  EditarCurso(curso:Curso):void{
    localStorage.setItem("id",curso.idCurso.toString());
    this.router.navigate(["editCurso"]);
  }

  InactivarCurso(curso:Curso):void{
    console.log("sdfghjk");
    if(confirm("¿Seguro que desesa inactivar el curso?")){
      curso.estado = false;
      this.service.save(curso).subscribe(data=>{});
    }  
  }

}
