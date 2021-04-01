import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelo/curso';
import { CursoService } from 'src/app/Service/curso.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  curso: Curso = new Curso();
  isLogged = false; 
  
  constructor(private router: Router, private service: CursoService,private tokenService:TokenService) { }

  ngOnInit(): void {
    this.Editar();
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  Editar() {
    let id = localStorage.getItem("id");
    if (id != null) {
      this.service.consultar(id).subscribe(data => {
        this.curso = data;
      });
    }
  }

  Actualizar(curso: Curso) {
    this.service.save(curso).subscribe(data => {
      //this.curso = data[0];
      alert(data[0]);
      this.router.navigate(["/listarCursos"]);
    });
  }

}
