import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/Modelo/calificacion';
import { CalificacionService } from 'src/app/Service/calificacion.service';
import { TokenService } from 'src/app/Service/token.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-Calificacion.component.html',
  styleUrls: ['./listar-Calificacion.component.css']
})
export class ListarCalificacionComponent implements OnInit {

  calificaciones: Calificacion[];
  pageActual: number = 1;
  isLogged = false;
  select?: boolean;

  constructor(private service: CalificacionService, private router: Router, private tokenService: TokenService) {
    this.calificaciones = [];
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.service.listar().subscribe(data => {        
        this.calificaciones = data;        
      });
    } else {
      this.isLogged = false;
    }
  }

  RegistrarCalificaciones() {
    this.router.navigate(["addCalificacion"]);
  }

  EditarCalificacion(calificacion: Calificacion): void {
    localStorage.setItem("id", calificacion.idCalificacion.toString());
    this.router.navigate(["editCalificacion"]);
  }

  InactivarCalificacion(calificacion: Calificacion): void {
    console.log("sdfghjk");
    if (confirm("¿Seguro que desesa inactivar la Calificacion?")) {
      calificacion.estado = false;
      this.service.save(calificacion).subscribe(data => { });
    }
  }

}
