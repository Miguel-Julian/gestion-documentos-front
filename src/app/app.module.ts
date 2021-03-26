import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './Curso/add/add.component';
import { EditComponent } from './Curso/edit/edit.component';
import { ListarComponent } from './Curso/listar/listar.component';
import { CursoService } from './Service/curso.service';
import { AddMateriaComponent } from './Materia/add-materia/add-materia.component';
import { ListarMateriaComponent } from './Materia/listar-materia/listar-materia.component';
import { EditMateriaComponent } from './Materia/edit-materia/edit-materia.component';
import { AddDocenteComponent } from './Docente/add-docente/add-docente.component';
import { ListarDocenteComponent } from './Docente/listar-docente/listar-docente.component';
import { EditDocenteComponent } from './Docente/edit-docente/edit-docente.component';
import { AddCalificacionComponent } from './Calificacion/add-calificacion/add-calificacion.component';
import { ListarCalificacionComponent } from './Calificacion/listar-calificacion/listar-calificacion.component';
import { EditCalificacionComponent } from './Calificacion/edit-calificacion/edit-calificacion.component';
import { AddEstudianteComponent } from './Estudiante/add-estudiante/add-estudiante.component';
import { EditEstudianteComponent } from './Estudiante/edit-estudiante/edit-estudiante.component';
import { ListarEstudianteComponent } from './Estudiante/listar-estudiante/listar-estudiante.component';
import { AddAsigComponent } from './AsignacionDocente/add-asig/add-asig.component';
import { EditAsigComponent } from './AsignacionDocente/edit-asig/edit-asig.component';
import { ListarAsigComponent } from './AsignacionDocente/listar-asig/listar-asig.component';
import { FilterPipe } from './pipe/filter.pipe';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    AddComponent,
    EditComponent,
    AddMateriaComponent,
    ListarMateriaComponent,
    EditMateriaComponent,
    AddDocenteComponent,
    ListarDocenteComponent,
    EditDocenteComponent,
    AddCalificacionComponent,
    ListarCalificacionComponent,
    EditCalificacionComponent,
    AddEstudianteComponent,
    EditEstudianteComponent,
    ListarEstudianteComponent,
    AddAsigComponent,
    EditAsigComponent,
    ListarAsigComponent,
    FilterPipe,
    ImportExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [CursoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
