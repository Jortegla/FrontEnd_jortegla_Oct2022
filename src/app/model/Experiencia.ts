import { Experiencia } from '../interfaz/IExperiencia';

export class CExperiencia implements Experiencia {
  idExp: number;
  tituloExp: String;
  nombreExp: String;
  fechaExp: number;
  descripcionExp: String;
  imagenExp: String;

  constructor() {
    this.idExp = 0;
    this.tituloExp = '';
    this.nombreExp = '';
    this.fechaExp = 0;
    this.descripcionExp = '';
    this.imagenExp = '';
  }
}
