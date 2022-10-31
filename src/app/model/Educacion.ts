import { educacion } from '../interfaz/IEducacion';

export class CEducacion implements educacion {
  idEdu: number;
  tituloEdu: String;
  institutoEdu: String;
  lugarEdu: String;
  estadoEdu: String;
  fechaEdu: number;
  logoEdu: String;

  constructor() {
    this.idEdu = 0;
    this.tituloEdu = '';
    this.institutoEdu = '';
    this.lugarEdu = '';
    this.estadoEdu = '';
    this.fechaEdu = 0;
    this.logoEdu = '';
  }
}
