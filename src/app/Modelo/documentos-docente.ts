import { Calificacion } from "./calificacion";
import { Tema } from "./tema";

export class DocumentosDocente {
    idDocumentosDocente: number = 0;
    tema:Tema = new Tema();
    calificacion : Calificacion = new Calificacion();
    tipoActividad : string = '';
    descripcionActividad : string = '';
    fechaInicio : Date = new Date();
    fechaLimite : Date = new Date();
    archivoDocente : string = '';    
    estado: boolean = true;
}

