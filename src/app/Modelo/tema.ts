import { AsignacionDocente } from "./asignacion-docente";

export class Tema {
    idTema: number = 0;
    asignacionDocente: AsignacionDocente = new AsignacionDocente();
    nombreTema: string = "";
    estado: boolean = true;    
}
