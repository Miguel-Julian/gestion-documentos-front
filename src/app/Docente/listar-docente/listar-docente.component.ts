import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Docente } from 'src/app/Modelo/docente';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { DocenteService } from 'src/app/Service/docente.service';

@Component({
  selector: 'app-listar-docente',
  templateUrl: './listar-docente.component.html',
  styleUrls: ['./listar-docente.component.css']
})
export class ListarDocenteComponent implements OnInit {

  docentes: Docente[]=[];
  pageActual: number = 1;
  asignacionDocente: AsignacionDocente[]=[];

  constructor(private router:Router, private service:DocenteService, 
    private asignacionService: AsignacionDocenteService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(data=>{
      this.docentes = data;
    });
  }

  RegistrarDocente(){
    this.router.navigate(["addDocente"]);
  }

  EditarDocente(docente:Docente):void{
    localStorage.setItem("id",docente.idDocente.toString());
    this.router.navigate(["editDocente"]);
    console.log("Edtar docente")
  }

  InactivarDocente(docente:Docente):void{
    console.log("Docente inactivo");
    if(confirm("¿Seguro que desesa inactivar el docente?")){
      docente.estado = false;
      this.service.save(docente).subscribe(data=>{});
    }  
  }

  ListarAsignacionDocente(){
    this.asignacionService.listar().subscribe(resultado=>{
      this.asignacionDocente = resultado;
      console.log(this.asignacionDocente);
    });
    this.router.navigate(["listarAsignacionDocente"]);
  }

}
