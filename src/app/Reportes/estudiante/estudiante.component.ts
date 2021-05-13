import { Component, OnInit } from '@angular/core';
import { AsignacionDocente } from 'src/app/Modelo/asignacion-docente';
import { Curso } from 'src/app/Modelo/curso';
import { Docente } from 'src/app/Modelo/docente';
import { DocumentosDocente } from 'src/app/Modelo/documentos-docente';
import { DocumentosEstudiante } from 'src/app/Modelo/documentos-estudiante';
import { Estudiante } from 'src/app/Modelo/estudiante';
import { Materia } from 'src/app/Modelo/materia';
import { Tema } from 'src/app/Modelo/tema';
import { AsignacionDocenteService } from 'src/app/Service/asignacion-docente.service';
import { DocenteService } from 'src/app/Service/docente.service';
import { DocumentosDocenteService } from 'src/app/Service/documentos-docente.service';
import { DocumentosEstudianteService } from 'src/app/Service/documentos-estudiante.service';
import { EstudianteService } from 'src/app/Service/estudiante.service';
import { MateriaService } from 'src/app/Service/materia.service';
import { TemaService } from 'src/app/Service/tema.service';
import { TokenService } from 'src/app/Service/token.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  isLogged = false;
  calificacion = false;
  nombreUsuario = '';
  asignacionDocentes: AsignacionDocente[] = []  
  curso: Curso = new Curso();
  materias: Materia[] = [];
  materia: Materia = new Materia();
  estudiante: Estudiante = new Estudiante();
  listTemas: Tema[] = [];
  listDocDocente: DocumentosDocente[] = [];
  listDocStudents: DocumentosEstudiante[] = [];
  listaMaterias: Materia[] = [];
  listEstudiante: Estudiante[] = [];  
  notaDefinitiva: number[] = [];

  constructor(private tokenService: TokenService, private temaService: TemaService,
    private doceteService: DocenteService, private asignacionDocenteService: AsignacionDocenteService,
    private docDocenteService: DocumentosDocenteService, private docStudentService: DocumentosEstudianteService,
    private service: AsignacionDocenteService, private materiaService: MateriaService,
    private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUsertName();
      this.materiaService.listar().subscribe(res => { this.listaMaterias = res });
      this.service.listar().subscribe(data => { this.asignacionDocentes = data; });
      this.estudianteService.listar().subscribe(res => { this.listEstudiante = res });   
      this.obtenerListaMateriasPorCurso()   
    }
  }
  downloadPDF() {
    // Extraemos el
    const DATA:HTMLElement = document.getElementById('cali')!;
    const doc = new jsPDF('l', 'pt', 'a4');
    
    const options = {
      background: 'white',
      scale: 3
    };    
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }
 
  obtenerListaMateriasPorCurso(): void {
    this.materias = [];
    this.estudianteService.listar().subscribe(students => {
      students.forEach(student => {
        if (student.usuario.nombreUsuario == this.nombreUsuario) {
          this.estudiante = student;
          this.asignacionDocenteService.listar().subscribe(res => {
            res.forEach(element => {
              if (student.curso.idCurso == element.curso.idCurso) {
                this.materias.push(element.materia);
                this.temaService.setIdCurso(student.curso.idCurso);
              }
            });
          });
        }
      });
    });
  }
  setCursoAndMateria(event: any): void {    
    this.temaService.setIdMateria(this.materia.idMateria);
    this.loadMatriz()
    document.getElementById("botonMostrar")?.removeAttribute("disabled");
  }

  loadMatriz() {
    this.calificacion = true
    this.docStudentService.notaDefinitiva(this.temaService.getIdCurso(),this.temaService.getIdMateria(),this.estudiante.idEstudiante.toString()).subscribe(nota=>{
      this.notaDefinitiva.push(nota);                    
    })
    this.temaService.listar().subscribe(temas => {
      this.listTemas = temas;
      temas.forEach(tem => {
        this.docDocenteService.listar(tem.idTema.toString()).subscribe(docsDocente => {
          docsDocente.forEach(docDocente => {
            this.listDocDocente.push(docDocente);
            this.docStudentService.listar(docDocente.idDocumentosDocente.toString()).subscribe(docsEstu => {
              docsEstu.forEach(docStudiante => {
                if(this.estudiante.idEstudiante == docStudiante.estudiante.idEstudiante){
                  this.listDocStudents.push(docStudiante);                                                    
                }                
              })
            });

          })
        });

      });
    });
  }

  quitarVacios() {
    var ths = document.getElementsByTagName("th")
    for (let i = 0; i < ths.length; i++) {
      if (ths[i].innerHTML.charAt(1) == '!') {
        var a = ths[i].parentNode;
        a?.removeChild(ths[i]);
        i = 0;
      }
    }
    var tds = document.getElementsByTagName("td")
    for (let i = 0; i < tds.length; i++) {
      if (tds[i].innerHTML.charAt(1) == '!') {
        var a = tds[i].parentNode;
        a?.removeChild(tds[i]);
        i = 0;
      }
    }
    document.getElementById("cali")?.setAttribute("style", "visibility: visible;");
    document.getElementById("descargar")?.setAttribute("style", "visibility: visible;");
  }

}
