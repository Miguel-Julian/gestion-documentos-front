import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/Modelo/estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private service:EstudianteService, private router: Router,private modalService: NgbModal) { 
    this.estudiantes = [];
  }

  ngOnInit(): void {
    this.service.listar().subscribe(data =>{
      this.estudiantes=data;
    });
  }

  open(content:any,estudiante:Estudiante) {
    this.modalService.open(content);
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
    console.log("Estudiante inactiva");
    if(confirm("¿Seguro que desesa inactivar el estudiante?")){
      estudiante.estado = false;
      this.service.save(estudiante).subscribe(data=>{});
    }  
  }

}
