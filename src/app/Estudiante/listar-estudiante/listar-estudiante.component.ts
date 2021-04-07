import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/Modelo/estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-Estudiante.component.html',
  styleUrls: ['./listar-Estudiante.component.css']
})
export class ListarEstudianteComponent implements OnInit {

  estudiantes: Estudiante[];
  pageActual: number = 1;
  filterEstudiante = '';
  estudianteModal: Estudiante = new Estudiante;
  isLogged = false; 

  constructor(private service:EstudianteService, private router: Router,private modalService: NgbModal,private tokenService:TokenService) { 
    this.estudiantes = [];
  }

  ngOnInit(): void {
    this.service.listar().subscribe(data =>{
      this.estudiantes=data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  open(content:any,estudiante:Estudiante) {
    this.modalService.open(content);
    estudiante.usuario.contrasenia = estudiante.dniEstudiante.toString();
    this.estudianteModal = estudiante;    
  }

  RegistrarEstudiantes(){
    this.router.navigate(["addEstudiante"]);
  }

  EditarEstudiante(estudiante:Estudiante):void{
    localStorage.setItem("id",estudiante.idEstudiante.toString());
    this.router.navigate(["editEstudiante"]);
  }

  InactivarEstudiante(estudiante:Estudiante):void{
    console.log("Estudiante inactivo");
    if(confirm("¿Seguro que desesa inactivar el estudiante?")){
      estudiante.estado = false;
      this.service.save(estudiante).subscribe(data=>{});
    }  
  }

}
