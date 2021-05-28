import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { DocumentosDocente } from '../Modelo/documentos-docente';
import { DocumentosDocenteService } from '../Service/documentos-docente.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TokenService } from '../Service/token.service';
import { DocenteService } from '../Service/docente.service';
import { AsignacionDocenteService } from '../Service/asignacion-docente.service';
import { TemaService } from '../Service/tema.service';
import { EstudianteService } from '../Service/estudiante.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  docDocent: DocumentosDocente = new DocumentosDocente();
  isLogged = false;
  documentoDocente: DocumentosDocente[] = [];
  //docsDocente: DocumentosDocente = new DocumentosDocente();
  public events: any[] = [];
  public options: any;

  constructor(private docDocenteService: DocumentosDocenteService, private tokenService: TokenService,
    private docenteService: DocenteService, private asignacionService: AsignacionDocenteService,
    private temaService: TemaService, private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      if (this.tokenService.getAuthorities()[0] == "ROLE_DOCENTE") {
        this.cargarEventosDocente();
      }else if(this.tokenService.getAuthorities()[0] == "ROLE_ESTUDIANTE"){
        this.cargarEventosEstudiante();
      }
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }


  }

  cargarEventosDocente() {
    this.docenteService.listar().subscribe(profes => {
      profes.forEach(profe => {
        if (profe.usuario.nombreUsuario == this.tokenService.getUsertName()) {
          this.asignacionService.listarPorDocente(profe.idDocente).subscribe(asignaciones => {
            asignaciones.forEach(asig => {
              this.temaService.setIdCurso(asig.curso.idCurso);
              this.temaService.setIdMateria(asig.materia.idMateria);
              this.temaService.listar().subscribe(temas => {
                temas.forEach(tema => {
                  this.docDocenteService.listar(tema.idTema + "").subscribe(docs => {
                    docs.forEach(doc => {
                      if (doc.estado == true) {
                        var a = {
                          title: doc.nombreActividad,
                          start: doc.fechaInicio,
                          end: doc.fechaLimite,
                          url: "listarDocEstudiante",
                          id: doc.idDocumentosDocente
                        }
                        this.events.push(a)
                      }
                    })

                  });
                })
              });
            })
          })
        }
      })
    })
    console.log(this.events)
    setTimeout(() => {
      this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: '2017-02-01',
        header: {
          left: 'prev,next',
          center: 'title',
        },
        events: this.events,
        eventClick: function (info: any) {
          info.jsEvent.preventDefault(); // don't let the browser navigate                        
          if (info.event.url) {
            localStorage.setItem("idDocDocente", info.event.id.toString());
            window.location.replace(info.event.url)
          }
        }
      }
    }, 1000);
  }

  cargarEventosEstudiante() {
    this.estudianteService.listar().subscribe(estudiantes => {
      estudiantes.forEach(estu => {
        if (estu.usuario.nombreUsuario == this.tokenService.getUsertName()) {
          this.asignacionService.listar().subscribe(asignaciones => {
            asignaciones.forEach(asig => {
              if (estu.curso.idCurso == asig.curso.idCurso) {
                this.temaService.setIdCurso(asig.curso.idCurso);
                this.temaService.setIdMateria(asig.materia.idMateria);
                this.temaService.listar().subscribe(temas => {
                  temas.forEach(tema => {
                    this.docDocenteService.listar(tema.idTema + "").subscribe(docs => {
                      docs.forEach(doc => {
                        if (doc.estado == true) {
                          var a = {
                            title: doc.nombreActividad,
                            start: doc.fechaInicio,
                            end: doc.fechaLimite,
                            url: "addDocEstudiante",
                            id: doc.idDocumentosDocente
                          }
                          this.events.push(a)
                        }
                      })

                    });
                  })
                });
              }
            })
          })
        }
      });
    });
    console.log(this.events)
    setTimeout(() => {
      this.options = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: '2017-02-01',
        header: {
          left: 'prev,next',
          center: 'title',
        },
        events: this.events,
        eventClick: function (info: any) {
          info.jsEvent.preventDefault(); // don't let the browser navigate                        
          if (info.event.url) {
            localStorage.setItem("idDocDocente", info.event.id.toString());
            window.location.replace(info.event.url)
          }
        }
      }
    }, 1000);
  }
}

