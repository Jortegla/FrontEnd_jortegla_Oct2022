import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CProyectos } from 'src/app/model/Proyectos';
import { Proyectos } from 'src/app/interfaz/IProyectos';
import { ProyectosService } from 'src/app/service/proyectos.service';
import swal from 'sweetalert2';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyectos[] = [];
  public proyecto: Proyectos = new CProyectos();
  public deleteProyecto: Proyectos | undefined;

  public newProyecto: Proyectos = new CProyectos();

  public nombreProy: String = '';
  public fechaProy: number = 0;
  public descripcionProy: String = '';
  public fotoProy: String = '';

  public idProy: number = 0;
  public editNombreProy: String = '';
  public editFechaProy: number = 0;
  public editDescripcionProy: String = '';
  public editFotoProy: String = '';

  constructor(private proyectosService: ProyectosService, public login: IniciarSesionService) {}

  ngOnInit(): void {
    this.getProyectos();
  }

  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe({
      next: (Response: Proyectos[]) => {
        this.proyectos = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddProyectos() {
    alert('Entre en onAddProyectos');

    this.newProyecto.nombreProy = this.nombreProy;
    this.newProyecto.fechaProy = this.fechaProy;
    this.newProyecto.descripcionProy = this.descripcionProy;
    this.newProyecto.fotoProy = this.fotoProy;

    this.proyectosService.addProyectos(this.newProyecto).subscribe({
      next: (Response: Proyectos) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onEditProyectos() {
    alert('Entre en onEditProyectos');
    console.log(this);

    this.proyecto.idProy = this.idProy;
    this.proyecto.nombreProy = this.editNombreProy;
    this.proyecto.fechaProy = this.editFechaProy;
    this.proyecto.descripcionProy = this.editDescripcionProy;
    this.proyecto.fotoProy = this.editFotoProy;

    this.proyectosService.editProyectos(this.proyecto).subscribe({
      next: (Response: Proyectos) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeletProyectos(idProy: number): void {
    swal({
      title: 'Estas seguro?',
      text: 'Confirma si deseas eliminar el proyecto',
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
        this.proyectosService.deleteProyectos(idProy).subscribe((dato) => {
          console.log(dato);
          this.getProyectos();
          swal(
            'Proyecto eliminado',
            'El proyecto fue eliminado con exito',
            'success'
          );
        });
      }
    });
  }

  public getProyectosById(idProy: number): void {
    this.proyectosService.getProyectosById(idProy).subscribe({
      next: (Response: Proyectos) => {
        var datos = Response;

        this.idProy = datos.idProy;
        this.editNombreProy = datos.nombreProy;
        this.editFechaProy = datos.fechaProy;
        this.editDescripcionProy = datos.descripcionProy;
        this.editFotoProy = datos.fotoProy;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
