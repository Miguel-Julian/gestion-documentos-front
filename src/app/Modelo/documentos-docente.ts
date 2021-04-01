import { Timestamp } from "rxjs";
import { AsignacionDocente } from "./asignacion-docente";
import { Calificacion } from "./calificacion";

export class DocumentosDocente {
    idDocumentosDocente: number = 0;
    asignacionDocente: AsignacionDocente = new AsignacionDocente();
    calificacion : Calificacion = new Calificacion();
    tipoActividad : string = '';
    descripcionActividad : string = '';
    fechaInicio : Date = new Date();
    fechaLimite : Date = new Date();
    archivoDocente : string = '';    
    estado: boolean = true;
}

