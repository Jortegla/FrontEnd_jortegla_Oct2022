import { Persona } from '../interfaz/IPersona';

export class CPersona implements Persona {
  id: number;
  nombre: String;
  apellido: String;
  titulo: String;
  foto: String;
  descripcion: String;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.titulo = '';
    this.foto = '';
    this.descripcion = '';
  }
}
