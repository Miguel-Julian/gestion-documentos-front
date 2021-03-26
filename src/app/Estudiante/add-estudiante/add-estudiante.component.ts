import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/Modelo/estudiante';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { CursoService } from 'src/app/Service/curso.service';
import { Curso } from 'src/app/Modelo/curso';
import { TipoDocumento } from 'src/app/Modelo/tipo-documento';
import { TipoDocumentoService } from 'src/app/Service/tipo-documento.service';
import { Usuario } from 'src/app/Modelo/usuario';

@Component({
  selector: 'app-add-Estudiante',
  templateUrl: './add-Estudiante.component.html',
  styleUrls: ['./add-Estudiante.component.css']
})
export class AddEstudianteComponent implements OnInit {

  estudiante: Estudiante = new Estudiante;
  estudiantes: Estudiante[]=[];
  usuario: Usuario = new Usuario();
  hide: boolean = true;
  message: string = "";
  ListaCursos: Curso[]=[];
  ListaTipoDocumento: TipoDocumento[]=[];

  constructor(private router:Router, private service:EstudianteService,private Cursoservice:CursoService,
    private TipoDocumentoService:TipoDocumentoService) { }

  ngOnInit(): void {
    this.Cursoservice.listar().subscribe(res=>{this.ListaCursos=res})
    this.TipoDocumentoService.listar().subscribe(res=>{this.ListaTipoDocumento=res});
    this.service.listar().subscribe(data => {
      this.estudiantes = data;
    });
  }

  getNombreCurso() {    
    this.ListaCursos.forEach(Curso => {
      if (Curso.idCurso==this.estudiante.curso.idCurso){                
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

  Registrar(){ 
    var flag: Boolean = true;
    for (let i = 0; i < this.estudiantes.length; i++) {
      if (this.estudiantes[i].dniEstudiante == this.estudiante.dniEstudiante) {
        flag = false;              
      }
    }
    if (flag==true) {
    this.getNombreCurso();     
    this.service.save(this.estudiante).subscribe(resultado=>{
      console.log(resultado);
      var nameError = document.getElementById("nombreError");
      if(nameError != undefined){
        nameError.innerHTML = resultado[0];
      }
      if(resultado[0]=="Se ha guardado el Estudiante"){
        this.hide=false;
        this.message = resultado[0];
        document.getElementById("btnRegistrar")?.setAttribute("disabled", "true");
        setTimeout(()=>{          
          this.router.navigate(["/listarEstudiantes"]);
        }, 2000);
      }
    });
  }else{
    alert("El Numero Documento ya esta registrado");
  }
  }
}
