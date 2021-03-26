import { Curso } from "./curso";
import { Docente } from "./docente";
import { Materia } from "./materia";

export class AsignacionDocente {
    //idAsignacionDoce: number = 0;
    docente: Docente = new Docente();
    curso: Curso = new Curso();
    materia: Materia = new Materia();
    estado: boolean = true;
}
