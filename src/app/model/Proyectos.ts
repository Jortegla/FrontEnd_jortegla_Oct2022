import { Proyectos } from '../interfaz/IProyectos';

export class CProyectos implements Proyectos {
  idProy: number;
  nombreProy: String;
  fechaProy: number;
  descripcionProy: String;
  fotoProy: String;

  constructor() {
    this.idProy = 0;
    this.nombreProy = '';
    this.fechaProy = 0;
    this.descripcionProy = '';
    this.fotoProy = '';
  }
}
