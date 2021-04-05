import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDocente'
})
export class FilterDocentePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultDocente = [];
    for (const docente of value) {
      if (
        String(docente.dniDocente).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.tipoDocumento.nombreTipoDocumento.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.nombreDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.apellidoDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.telefonoDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.correoDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.fechaNacimientoDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        docente.ciudadDocente.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultDocente.push(docente);
      }
    }
    return resultDocente;
  }
}
