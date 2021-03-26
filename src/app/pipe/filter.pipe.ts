import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultEstudiante = [];
    for (const estudiante of value) {
      if (
        String(estudiante.dniEstudiante).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.tipoDocumento.nombreTipoDocumento.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.nombreEstudiante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.apellidoEstudiante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.telefonoEstudiante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.correoEstudiante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.fechaNacimientoEstudiante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.ciudadEstudiante.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        estudiante.curso.nombreCurso.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultEstudiante.push(estudiante);
      }
    }
    return resultEstudiante;
  }

}
