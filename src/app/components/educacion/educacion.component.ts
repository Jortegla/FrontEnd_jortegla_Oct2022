import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CEducacion } from 'src/app/model/Educacion';
import { educacion } from 'src/app/interfaz/IEducacion';
import { EducacionService } from 'src/app/service/educacion.service';
import swal from 'sweetalert2';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  public educaciones: educacion[] = [];
  public educacion: educacion = new CEducacion();
  public deleteEducacion: educacion | undefined;
  public newEducation: educacion = new CEducacion();

  public tituloEdu: String = '';
  public institutoEdu: String = '';
  public lugarEdu: String = '';
  public estadoEdu: String = '';
  public fechaEdu: number = 0;
  public logoEdu: String = '';

  public idEdu: number = 0;
  public editTituloEdu: String = '';
  public editInstitutoEdu: String = '';
  public editLugarEdu: String = '';
  public editEstadoEdu: String = '';
  public editFechaEdu: number = 0;
  public editLogoEdu: String = '';

  constructor(private educacionService: EducacionService, public login: IniciarSesionService) {}

  ngOnInit(): void {
    this.getEducaciones();
  }

  public getEducaciones(): void {
    this.educacionService.getEducacion().subscribe({
      next: (Response: educacion[]) => {
        this.educaciones = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddEducacion() {
    alert('Entre en onAddEducacion');
    /*   console.log(this); */

    this.newEducation.tituloEdu = this.tituloEdu;
    this.newEducation.institutoEdu = this.institutoEdu;
    this.newEducation.lugarEdu = this.lugarEdu;
    this.newEducation.estadoEdu = this.estadoEdu;
    this.newEducation.fechaEdu = this.fechaEdu;
    this.newEducation.logoEdu = this.logoEdu;
    /* console.log(this.newEducation); */

    this.educacionService.addEducacion(this.newEducation).subscribe({
      next: (Response: educacion) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onEditEducacion() {
    alert('Entre en onEditEducacion');
    console.log(this);

    this.educacion.idEdu = this.idEdu;
    this.educacion.tituloEdu = this.editTituloEdu;
    this.educacion.institutoEdu = this.editInstitutoEdu;
    this.educacion.lugarEdu = this.editLugarEdu;
    this.educacion.estadoEdu = this.editEstadoEdu;
    this.educacion.fechaEdu = this.editFechaEdu;
    this.educacion.logoEdu = this.editLogoEdu;

    this.educacionService.editEducacion(this.educacion).subscribe({
      next: (Response: educacion) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeletEducacion(idEdu: number): void {
    swal({
      title: 'Estas seguro?',
      text: 'Confirma si deseas eliminar la educacion',
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
        this.educacionService.deleteEducacion(idEdu).subscribe((dato) => {
          console.log(dato);
          this.getEducaciones();
          swal(
            'Educacion eliminada',
            'La educacion fue eliminada con exito',
            'success'
          );
        });
      }
    });
  }

  public getEducacionById(idEdu: number): void {
    this.educacionService.getEducacionById(idEdu).subscribe({
      next: (Response: educacion) => {
        /* asigno la respuesta a la variables por facilidad de correccion al futuro*/
        var datos = Response;

        /* aqui paso los datos obtenidos a los campos del formulario editar usando angular para regrescar en tiempo real sin repetir codigo*/
        this.idEdu = datos.idEdu;
        this.editTituloEdu = datos.tituloEdu;
        this.editInstitutoEdu = datos.institutoEdu;
        this.editLugarEdu = datos.lugarEdu;
        this.editEstadoEdu = datos.estadoEdu;
        this.editFechaEdu = datos.fechaEdu;
        this.editLogoEdu = datos.logoEdu;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
