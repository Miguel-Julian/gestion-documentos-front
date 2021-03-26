
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/Modelo/calificacion';
import { CalificacionService } from 'src/app/Service/calificacion.service';

@Component({
  selector: 'app-edit-Calificacion',
  templateUrl: './edit-Calificacion.component.html',
  styleUrls: ['./edit-Calificacion.component.css']
})
export class EditCalificacionComponent implements OnInit {

  calificacion: Calificacion = new Calificacion();
  constructor(private router: Router, private service: CalificacionService) { }

  ngOnInit(): void {
    this.Editar();
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
    this.service.save(calificacion).subscribe(data => {
      //this.calificacion = data[0];
      alert(data[0]);
      this.router.navigate(["/listarCalificaciones"]);
    });
  }

}
