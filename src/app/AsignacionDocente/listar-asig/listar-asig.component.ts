import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';

@Component({
  selector: 'app-listar-asig',
  templateUrl: './listar-asig.component.html',
  styleUrls: ['./listar-asig.component.css']
})
export class ListarAsigComponent implements OnInit {

  asignacionDocentes: AsignacionDocente[]=[]
  pageActual: number = 1;

  constructor(private router:Router, private service:AsignacionDocenteService) { } 

  ngOnInit(): void {
    this.service.listar().subscribe(data=>{
      this.asignacionDocentes = data;
    });
  }

  Asignacion(){
    this.router.navigate(["addAsignacionDocente"]);
  }

  EditarAsignacion(asignacionDocente:AsignacionDocente):void{
    this.service.asignacionDocente = asignacionDocente;
    this.router.navigate(["editAsignacionDocente"]);
  }

  InactivarAsignacion(asignacionDocente:AsignacionDocente):void{
    console.log("Asignacion del docente inactiva");
    if(confirm("¿Seguro que desesa inactivar esta asignacion?")){
      asignacionDocente.estado = false;
      this.service.save(asignacionDocente).subscribe(data=>{});
    }  
  }


}
