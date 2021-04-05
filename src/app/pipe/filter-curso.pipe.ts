import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCurso'
})
export class FilterCursoPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultCurso = [];
    for (const curso of value) {
      if (
        String(curso.idCurso).toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        curso.nombreCurso.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultCurso.push(curso);
      }
    }
    return resultCurso;
  }

}
