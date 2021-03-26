import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Materia } from 'src/app/Modelo/materia';
import { MateriaService } from 'src/app/Service/materia.service';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css']
})
export class AddMateriaComponent implements OnInit {

  materia: Materia = new Materia();
  hide: boolean = true;
  message: string = "";

  constructor(private router:Router, private service:MateriaService) { }

  ngOnInit(): void {
  }

  Registrar(){
    this.service.save(this.materia).subscribe(resultado=>{
      console.log(resultado);
      //alert(resultado[0]);
      var nameError = document.getElementById("nombreError");
      if(nameError != undefined){
        nameError.innerHTML = resultado[0];
      }
      if(resultado[0]=="Se ha guardado la materia"){
        this.hide=false;
        this.message = resultado[0];
        document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
        setTimeout(()=>{          
          this.router.navigate(["/listarMaterias"]);
        }, 2000);
      }
    });
  }

}
