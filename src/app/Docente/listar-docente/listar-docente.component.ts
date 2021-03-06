import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Docente } from 'src/app/Modelo/docente';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { DocenteService } from 'src/app/Service/docente.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-listar-docente',
  templateUrl: './listar-docente.component.html',
  styleUrls: ['./listar-docente.component.css']
})
export class ListarDocenteComponent implements OnInit {

  docentes: Docente[]=[];
  pageActual: number = 1;
  filterDocente = '';
  docenteModal: Docente = new Docente;
  asignacionDocente: AsignacionDocente[]=[];
  isLogged = false;

  constructor(private router:Router, private service:DocenteService, private modalService: NgbModal,
    private asignacionService: AsignacionDocenteService,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(data=>{
      this.docentes = data;
    });    
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  open(content:any, docente: Docente) {
    this.modalService.open(content);
    docente.usuario.contrasenia = docente.dniDocente.toString();
    this.docenteModal = docente;    
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
