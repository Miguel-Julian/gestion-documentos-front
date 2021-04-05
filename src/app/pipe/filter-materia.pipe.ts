import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMateria'
})
export class FilterMateriaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultMateria = [];
    for (const materia of value) {
      if (
        String(materia.idMateria).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        materia.nombreMateria.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultMateria.push(materia);
      }
    }
    return resultMateria;
  }

}
