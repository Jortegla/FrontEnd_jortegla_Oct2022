import { Skill } from '../interfaz/ISkill';

export class CSkill implements Skill {
  idSk: number;
  nombreSk: String;
  imagenSk: String;
  porcentajeSk: number;

  constructor() {
    this.idSk = 0;
    this.nombreSk = '';
    this.imagenSk = '';
    this.porcentajeSk = 0;
  }
}
