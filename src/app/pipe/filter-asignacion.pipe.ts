import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAsignacion'
})
export class FilterAsignacionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultAsignacion = [];
    for (const asignacion of value) {
      if (
        String(asignacion.docente.nombreDocente).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        asignacion.docente.apellidoDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        asignacion.materia.nombreMateria.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        asignacion.curso.nombreCurso.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultAsignacion.push(asignacion);
      }
    }
    return resultAsignacion;
  }

}
