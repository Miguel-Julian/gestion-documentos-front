
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/Modelo/estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { CursoService } from 'src/app/Service/curso.service';
import { Curso } from 'src/app/Modelo/curso';
import { TipoDocumento } from 'src/app/Modelo/tipo-documento';
import { TipoDocumentoService } from 'src/app/Service/tipo-documento.service';

@Component({
  selector: 'app-edit-Estudiante',
  templateUrl: './edit-Estudiante.component.html',
  styleUrls: ['./edit-Estudiante.component.css']
})
export class EditEstudianteComponent implements OnInit {

  estudiante: Estudiante = new Estudiante();
  ListaCursos: Curso[] = [];
  ListaTipoDocumento: TipoDocumento[]=[];
  constructor(private router: Router, private service: EstudianteService, 
    private Cursoservice: CursoService, private tipoDocumentoService: TipoDocumentoService) { }

  ngOnInit(): void {
    this.Editar();
    this.Cursoservice.listar().subscribe(res => { this.ListaCursos = res });
    this.tipoDocumentoService.listar().subscribe(res=>{this.ListaTipoDocumento=res});
  }
  
  getNombreCurso() {
    this.ListaCursos.forEach(Curso => {
      if (Curso.idCurso == this.estudiante.curso.idCurso) {
        this.estudiante.curso = Curso;
      }
    });
  }

  getNombreTipoDocumento(){
    this.ListaTipoDocumento.forEach(TipoDocumento =>{
      if (TipoDocumento.idTipoDocumento==this.estudiante.tipoDocumento.idTipoDocumento){
        this.estudiante.tipoDocumento = TipoDocumento;
      }
    });
  }

  Editar() {
    let id = localStorage.getItem("id");
    if (id != null) {
      this.service.consultar(id).subscribe(data => {
        this.estudiante = data;
      });
    }
  }

  Actualizar(estudiante: Estudiante) {
    this.getNombreCurso();
    this.service.save(estudiante).subscribe(data => {
      //this.estudiante = data[0];
      alert(data[0]);
      this.router.navigate(["/listarEstudiantes"]);
    });
  }

}
