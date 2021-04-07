import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Materia } from 'src/app/Modelo/materia';
import { MateriaService } from 'src/app/Service/materia.service';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-listar-materia',
  templateUrl: './listar-materia.component.html',
  styleUrls: ['./listar-materia.component.css']
})
export class ListarMateriaComponent implements OnInit {

  materias:Materia[]=[];
  filterMateria = '';
  pageActual: number = 1;
  materiaModal:Materia = new Materia();
  isLogged = false; 
  
  constructor(private service:MateriaService, private router:Router,private modalService: NgbModal,private tokenService:TokenService) {  }
  
  ngOnInit(): void {
    this.service.listar().subscribe(data=>{
      this.materias = data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  open(content:any,materia:Materia) {
    this.modalService.open(content);
    this.materiaModal = materia;    
  }

  RegistrarMateria(){
    this.router.navigate(["addMateria"]);
  }

  EditarMateria(materia:Materia):void{
    localStorage.setItem("id",materia.idMateria.toString());
    this.router.navigate(["editMateria"]);
  }

  InactivarMateria(materia:Materia):void{
    console.log("materia inactiva");
    if(confirm("¿Seguro que desesa inactivar el curso?")){
      materia.estado = false;
      this.service.save(materia).subscribe(data=>{});
    }  
  }

}
