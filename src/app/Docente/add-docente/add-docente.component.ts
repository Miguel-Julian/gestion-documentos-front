import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docente } from 'src/app/Modelo/docente';
import { TipoDocumento } from 'src/app/Modelo/tipo-documento';
import { Usuario } from 'src/app/Modelo/usuario';
import { DocenteService } from 'src/app/Service/docente.service';
import { TipoDocumentoService } from 'src/app/Service/tipo-documento.service';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {

  docente: Docente = new Docente();
  docentes: Docente[] = [];
  usuario: Usuario = new Usuario();
  hide: boolean = true;
  message: string = "";
  ListaTipoDocumento: TipoDocumento[] = [];
  usuarios: Usuario[] = [];
  isLogged = false; 

  constructor(private router: Router, private service: DocenteService,
    private TipoDocumentoService: TipoDocumentoService, private usuarioService: UsuarioService,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.TipoDocumentoService.listar().subscribe(res => { this.ListaTipoDocumento = res });
    this.service.listar().subscribe(data => {
      this.docentes = data;
    });
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  getNombreTipoDocumento() {
    this.ListaTipoDocumento.forEach(TipoDocumento => {
      if (TipoDocumento.idTipoDocumento == this.docente.tipoDocumento.idTipoDocumento) {
        this.docente.tipoDocumento = TipoDocumento;
      }
    });
  }


  Registrar() {
    var flag: Boolean = true;
    for (let i = 0; i < this.docentes.length; i++) {
      if (this.docentes[i].dniDocente == this.docente.dniDocente) {
        flag = false;             
      }
    }
    if (flag==true) {
      this.service.save(this.docente).subscribe(resultado => {
        console.log(resultado);
        var nameError = document.getElementById("nombreError");
        if (nameError != undefined) {
          nameError.innerHTML = resultado[0];
        }
        if (resultado[0] == "Se ha guardado el Docente") {
          this.hide = false;
          this.message = resultado[0];
          document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
          setTimeout(() => {
            this.router.navigate(["/listarDocentes"]);
          }, 2000);
        }
      });
    }else{
      alert("El Numero Documento ya esta registrado");
    }
  }


}
