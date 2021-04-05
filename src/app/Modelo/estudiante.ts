import { Curso } from 'src/app/Modelo/curso';
import { TipoDocumento } from './tipo-documento';
import { Usuario } from 'src/app/Modelo/usuario';

export class Estudiante {
    idEstudiante: number = 0;
    dniEstudiante: number = 0;
    tipoDocumento: TipoDocumento = new TipoDocumento;
    nombreEstudiante: String = "";
    apellidoEstudiante: String = "";
    telefonoEstudiante: String = "";
    usuario: Usuario = new Usuario;
    correoEstudiante: String = "";
    fechaNacimientoEstudiante: Date = new Date();
    ciudadEstudiante: String = "";
    curso: Curso = new Curso();
    estado: boolean = true;
}

