import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Materia } from 'src/app/Modelo/materia';
import { MateriaService } from 'src/app/Service/materia.service';

@Component({
  selector: 'app-edit-materia',
  templateUrl: './edit-materia.component.html',
  styleUrls: ['./edit-materia.component.css']
})
export class EditMateriaComponent implements OnInit {

  materia: Materia = new Materia();
  constructor(private router: Router, private service:MateriaService) { }
  
  ngOnInit(): void {
    this.Editar();
  }

  Editar() {
    let id = localStorage.getItem("id");
    if (id != null) {
      this.service.consultar(id).subscribe(data => {
        this.materia = data;
      });
    }
  }

  Actualizar(materia:Materia) {
    this.service.save(materia).subscribe(data => {      
      alert(data[0]);
      this.router.navigate(["/listarMaterias"]);
    });
  }

}
