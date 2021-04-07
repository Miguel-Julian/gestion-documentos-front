
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/Modelo/calificacion';
import { CalificacionService } from 'src/app/Service/calificacion.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-edit-Calificacion',
  templateUrl: './edit-Calificacion.component.html',
  styleUrls: ['./edit-Calificacion.component.css']
})
export class EditCalificacionComponent implements OnInit {

  calificacion: Calificacion = new Calificacion();
  isLogged = false;

  constructor(private router: Router, private service: CalificacionService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.Editar();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  Editar() {
    let id = localStorage.getItem("id");
    if (id != null) {
      this.service.consultar(id).subscribe(data => {
        this.calificacion = data;
      });
    }
  }

  Actualizar(calificacion: Calificacion) {    
    this.service.save(calificacion).subscribe(dat => {
      alert(dat[0])
    });   
    var a:any = calificacion.sel;
    if(a == "true") {
      this.service.listar().subscribe(cals =>{      
        cals.forEach(cal =>{        
          if(cal.idCalificacion != calificacion.idCalificacion){
            cal.sel =  false;          
            this.service.save(cal).subscribe();
          }
        });
      });      
    }    

    setTimeout(() => {
      this.router.navigate(["/listarCalificaciones"]);
    }, 1000);

  }

}
