import { Usuario } from '../interfaz/IUsuario';

export class CUsuario implements Usuario {
  id:number;
  username: String;
  password: String;
  nombre: String;
  apellido: String;
  email: String;


  constructor() {
    this.id = 0;
    this.username = '';
    this.password = '';
    this.nombre = '';
    this.apellido = '';
    this.email = '';

  }
}
