import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/Modelo/calificacion';
import { CalificacionService } from 'src/app/Service/calificacion.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-add-Calificacion',
  templateUrl: './add-Calificacion.component.html',
  styleUrls: ['./add-Calificacion.component.css']
})
export class AddCalificacionComponent implements OnInit {

  calificacion: Calificacion = new Calificacion;
  hide: boolean = true;
  message: string = "";
  isLogged = false; 

  constructor(private router:Router, private service:CalificacionService,private tokenService:TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;     
    }else{
      this.isLogged = false;      
    }
  }

  Registrar(){
    this.service.save(this.calificacion).subscribe(resultado=>{
      console.log(resultado);
      //alert(resultado[0]);
      var nameError = document.getElementById("nombreError");
      if(nameError != undefined){
        nameError.innerHTML = resultado[0];
      }
      if(resultado[0]=="Se ha guardado la calificacion"){
        this.hide=false;
        this.message = resultado[0];
        document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
        setTimeout(()=>{          
          this.router.navigate(["/listarCalificaciones"]);
        }, 2000);
      }
    });
  }

}
