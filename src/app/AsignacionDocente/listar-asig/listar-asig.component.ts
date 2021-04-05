import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-listar-asig',
  templateUrl: './listar-asig.component.html',
  styleUrls: ['./listar-asig.component.css']
})
export class ListarAsigComponent implements OnInit {

  asignacionDocentes: AsignacionDocente[]=[];
  filterAsignacion = '';
  pageActual: number = 1;
  isLogged = false;

  constructor(private router:Router, private service:AsignacionDocenteService, private tokenService: TokenService) { } 

  ngOnInit(): void {
    this.service.listar().subscribe(data=>{
      this.asignacionDocentes = data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
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
