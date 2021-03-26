import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/Modelo/curso';
import { CursoService } from 'src/app/Service/curso.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  curso: Curso = new Curso;
  hide: boolean = true;
  message: string = "";

  constructor(private router:Router, private service:CursoService) { }

  ngOnInit(): void {
  }

  Registrar(){
    this.service.save(this.curso).subscribe(resultado=>{
      console.log(resultado);
      //alert(resultado[0]);
      var nameError = document.getElementById("nombreError");
      if(nameError != undefined){
        nameError.innerHTML = resultado[0];
      }
      if(resultado[0]=="Se ha guardado el curso"){
        this.hide=false;
        this.message = resultado[0];
        document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
        setTimeout(()=>{
          
          this.router.navigate(["/listarCursos"]);
        }, 2000);
      }
    });
  }
}
