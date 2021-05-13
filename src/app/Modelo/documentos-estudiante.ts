import { DocumentosDocente } from "./documentos-docente";
import { Estudiante } from "./estudiante";

export class DocumentosEstudiante {    
    documentosDocente: DocumentosDocente = new DocumentosDocente();
    estudiante: Estudiante = new Estudiante();
    nota: number = 0.0;
    rutaArchivo : string = '';  
    nombreArchivo : string = '';
    comentario: string = '';
    fechaEntrega : Date = new Date();  
    estado: boolean = false;
}

