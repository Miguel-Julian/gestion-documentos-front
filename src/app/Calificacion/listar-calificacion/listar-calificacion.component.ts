import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/Modelo/calificacion';
import { CalificacionService } from 'src/app/Service/calificacion.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-Calificacion.component.html',
  styleUrls: ['./listar-Calificacion.component.css']
})
export class ListarCalificacionComponent implements OnInit {

  calificaciones: Calificacion[];
  pageActual: number = 1;

  constructor(private service:CalificacionService, private router: Router) { 
    this.calificaciones = [];
  }

  ngOnInit(): void {
    this.service.listar().subscribe(data =>{
      this.calificaciones=data;
    });
  }

  RegistrarCalificaciones(){
    this.router.navigate(["addCalificacion"]);
  }

  EditarCalificacion(calificacion:Calificacion):void{
    localStorage.setItem("id",calificacion.idCalificacion.toString());
    this.router.navigate(["editCalificacion"]);
  }

  InactivarCalificacion(calificacion:Calificacion):void{
    console.log("sdfghjk");
    if(confirm("¿Seguro que desesa inactivar la Calificacion?")){
      calificacion.estado = false;
      this.service.save(calificacion).subscribe(data=>{});
    }  
  }

}
