import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from 'src/app/Modelo/docente';
import { TipoDocumento } from 'src/app/Modelo/tipo-documento';
import { DocenteService } from 'src/app/Service/docente.service';
import { TipoDocumentoService } from 'src/app/Service/tipo-documento.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-edit-docente',
  templateUrl: './edit-docente.component.html',
  styleUrls: ['./edit-docente.component.css']
})
export class EditDocenteComponent implements OnInit {

  docente: Docente = new Docente();
  ListaTipoDocumento: TipoDocumento[]=[];
  isLogged = false; 

  constructor(private router: Router, private service:DocenteService,
    private TipoDocumentoService:TipoDocumentoService,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.Editar();
    this.TipoDocumentoService.listar().subscribe(res=>{this.ListaTipoDocumento=res});
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  getNombreTipoDocumento(){
    this.ListaTipoDocumento.forEach(TipoDocumento =>{
      if (TipoDocumento.idTipoDocumento==this.docente.tipoDocumento.idTipoDocumento){
        this.docente.tipoDocumento = TipoDocumento;
      }
    });
  }

  Editar() {    
    let id = localStorage.getItem("id");
    if (id != null){
      this.service.consultar(id).subscribe(data=>{
        this.docente = data;
      });      
    }
  }

  Actualizar(docente:Docente) {
    this.service.save(docente).subscribe(data => {
      //this.estudiante = data[0];
      alert(data[0]);
      this.router.navigate(["/listarDocentes"]);
    });
  }
}
