import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelo/curso';
import { CursoService } from 'src/app/Service/curso.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  cursos: Curso[];
  filterCurso = '';
  pageActual: number = 1;
  isLogged = false; 

  constructor(private service:CursoService, private router: Router,private tokenService:TokenService) { 
    this.cursos = [];
  }

  ngOnInit(): void {
    this.service.listar().subscribe(data =>{
      this.cursos=data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  RegistrarCursos(){
    this.router.navigate(["addCurso"]);
  }

  EditarCurso(curso:Curso):void{
    localStorage.setItem("id",curso.idCurso.toString());
    this.router.navigate(["editCurso"]);
  }

  InactivarCurso(curso:Curso):void{    
    if(confirm("¿Seguro que desesa inactivar el curso?")){
      curso.estado = false;
      this.service.save(curso).subscribe(data=>{});
    }  
  }

}
