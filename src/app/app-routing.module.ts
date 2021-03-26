import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAsigComponent } from './AsignacionDocente/add-asig/add-asig.component';
import { EditAsigComponent } from './AsignacionDocente/edit-asig/edit-asig.component';
import { ListarAsigComponent } from './AsignacionDocente/listar-asig/listar-asig.component';
import { AddCalificacionComponent } from './Calificacion/add-calificacion/add-calificacion.component';
import { EditCalificacionComponent } from './Calificacion/edit-calificacion/edit-calificacion.component';
import { ListarCalificacionComponent } from './Calificacion/listar-calificacion/listar-calificacion.component';
import { AddComponent } from './Curso/add/add.component';
import { EditComponent } from './Curso/edit/edit.component';
import { ListarComponent } from './Curso/listar/listar.component';
import { AddDocenteComponent } from './Docente/add-docente/add-docente.component';
import { EditDocenteComponent } from './Docente/edit-docente/edit-docente.component';
import { ListarDocenteComponent } from './Docente/listar-docente/listar-docente.component';
import { AddEstudianteComponent } from './Estudiante/add-estudiante/add-estudiante.component';
import { EditEstudianteComponent } from './Estudiante/edit-estudiante/edit-estudiante.component';
import { ListarEstudianteComponent } from './Estudiante/listar-estudiante/listar-estudiante.component';
import { AddMateriaComponent } from './Materia/add-materia/add-materia.component';
import { EditMateriaComponent } from './Materia/edit-materia/edit-materia.component';
import { ListarMateriaComponent } from './Materia/listar-materia/listar-materia.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';

const routes: Routes = [
  {path:'listarCursos', component:ListarComponent},
  {path:'addCurso', component:AddComponent},
  {path:'editCurso', component:EditComponent},
  {path:'listarMaterias', component:ListarMateriaComponent},
  {path:'addMateria', component:AddMateriaComponent},
  {path:'editMateria', component:EditMateriaComponent},
  {path:'listarDocentes', component:ListarDocenteComponent},
  {path:'addDocente', component:AddDocenteComponent},
  {path:'editDocente', component:EditDocenteComponent},
  {path:'listarCalificaciones', component:ListarCalificacionComponent},
  {path:'addCalificacion', component:AddCalificacionComponent},
  {path:'editCalificacion', component:EditCalificacionComponent},
  {path:'listarEstudiantes', component:ListarEstudianteComponent},
  {path:'addEstudiante', component:AddEstudianteComponent},
  {path:'editEstudiante', component:EditEstudianteComponent},
  {path:'listarAsignacionDocente', component:ListarAsigComponent},
  {path:'addAsignacionDocente', component:AddAsigComponent},
  {path:'editAsignacionDocente', component:EditAsigComponent},
  {path:'import', component:ImportExcelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
