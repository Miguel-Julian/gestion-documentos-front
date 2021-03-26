import { TipoDocumento } from "./tipo-documento";
import { Usuario } from "./usuario";

export class Docente {
    idDocente: number = 0;
    dniDocente: number = 0;
    tipoDocumento: TipoDocumento = new TipoDocumento();
    nombreDocente: string = "";
    apellidoDocente: string = "";
    telefonoDocente: string = "";
    usuario: Usuario = new Usuario;
    correoDocente: string = "";
    fechaNacimientoDocente: Date = new Date();
    ciudadDocente: string = "";
    estado: boolean = true;
}
