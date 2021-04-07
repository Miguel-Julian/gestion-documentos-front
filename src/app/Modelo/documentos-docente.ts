import { Calificacion } from "./calificacion";
import { Tema } from "./tema";

export class DocumentosDocente {
    idDocumentosDocente: number = 0;
    tema:Tema = new Tema();
    calificacion : Calificacion = new Calificacion();
    nombreActividad : string = "";
    tipoActividad : string = '';
    descripcionActividad : string = '';
    fechaInicio : Date = new Date();
    fechaLimite : Date = new Date();
    rutaArchivo : string = '';  
    nombreArchivo : string = '';    
    estado: boolean = true;
}

