import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CSkill } from 'src/app/model/skill';
import { Skill } from 'src/app/interfaz/ISkill';
import { SkillService } from 'src/app/service/skill.service';
import swal from 'sweetalert2';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  public skills: Skill[] = [];
  public skill: Skill = new CSkill();
  public deleteSkill: Skill | undefined;
  public newSkill: Skill = new CSkill();

  public nombreSk: String = '';
  public imagenSk: String = '';
  public porcentajeSk: number = 0;

  public idSk: number = 0;
  public editNombreSk: String = '';
  public editImagenSk: String = '';
  public editPorcentajeSk: number = 0;

  constructor(private skillService: SkillService, public login:IniciarSesionService) {}

  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills(): void {
    this.skillService.getSkill().subscribe({
      next: (Response: Skill[]) => {
        this.skills = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddSkill() {
    alert('Entre en onAddSkill');

    this.newSkill.nombreSk = this.nombreSk;
    this.newSkill.imagenSk = this.imagenSk;
    this.newSkill.porcentajeSk = this.porcentajeSk;

    this.skillService.addSkill(this.newSkill).subscribe({
      next: (Response: Skill) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onEditSkill() {
    alert('Entre en onEditSkill');
    console.log(this);

    this.skill.idSk = this.idSk;
    this.skill.nombreSk = this.editNombreSk;
    this.skill.imagenSk = this.editImagenSk;
    this.skill.porcentajeSk = this.editPorcentajeSk;

    this.skillService.editSkill(this.skill).subscribe({
      next: (Response: Skill) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeletSkill(idSk: number): void {
    swal({
      title: 'Estas seguro?',
      text: 'Confirma si deseas eliminar la Habilidad',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true,
    }).then((result) => {
      if (result.value) {
        this.skillService.deleteSkill(idSk).subscribe((dato) => {
          console.log(dato);
          this.getSkills();
          swal(
            'Habilidad eliminada',
            'La habilidad fue eliminada con exito',
            'success'
          );
        });
      }
    });
  }

  public getSkillById(idSk: number): void {
    this.skillService.getSkillById(idSk).subscribe({
      next: (Response: Skill) => {
        var datos = Response;

        this.idSk = datos.idSk;
        this.editNombreSk = datos.nombreSk;
        this.editImagenSk = datos.imagenSk;
        this.editPorcentajeSk = datos.porcentajeSk;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
