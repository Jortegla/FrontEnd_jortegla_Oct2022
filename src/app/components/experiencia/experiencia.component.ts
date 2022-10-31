import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { CExperiencia } from 'src/app/model/Experiencia';
import { Experiencia } from 'src/app/interfaz/IExperiencia';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert2';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  /*  public previsualizacion: String = "";
  public archivos:any = []; */
  public experiencias: Experiencia[] = [];
  public experiencia: Experiencia = new CExperiencia();
  public deleteExperiencia: Experiencia | undefined;
  public newExperiencia: Experiencia = new CExperiencia();

  public tituloExp: String = '';
  public nombreExp: String = '';
  public fechaExp: number = 0;
  public descripcionExp: String = '';
  public imagenExp: String = '';

  public idExp: number = 0;
  public editTituloExp: String = '';
  public editNombreExp: String = '';
  public editFechaExp: number = 0;
  public editDescripcionExp: String = '';
  public editImagenExp: String = '';

  constructor(
    private experienciaService: ExperienciaService,
    private sanitizer: DomSanitizer,
    public login: IniciarSesionService
  ) {}

  ngOnInit(): void {
    this.getExperiencias();
  }

  public getExperiencias(): void {
    this.experienciaService.getExperiencia().subscribe({
      next: (Response: Experiencia[]) => {
        this.experiencias = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onAddExperiencia() {
    alert('Entre en onAddExperiencia');

    this.newExperiencia.tituloExp = this.tituloExp;
    this.newExperiencia.nombreExp = this.nombreExp;
    this.newExperiencia.fechaExp = this.fechaExp;
    this.newExperiencia.descripcionExp = this.descripcionExp;
    this.newExperiencia.imagenExp = this.imagenExp;

    this.experienciaService.addExperiencia(this.newExperiencia).subscribe({
      next: (Response: Experiencia) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onEditExperiencia() {
    alert('Entre en onEditExperiencia');
    console.log(this);

    this.experiencia.idExp = this.idExp;
    this.experiencia.tituloExp = this.editTituloExp;
    this.experiencia.nombreExp = this.editNombreExp;
    this.experiencia.fechaExp = this.editFechaExp;
    this.experiencia.descripcionExp = this.editDescripcionExp;
    this.experiencia.imagenExp = this.editImagenExp;

    this.experienciaService.editExperiencia(this.experiencia).subscribe({
      next: (Response: Experiencia) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeletExperiencia(idExp: number): void {
    swal({
      title: 'Estas seguro?',
      text: 'Confirma si deseas eliminar la experiencia',
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
        this.experienciaService.deleteExperiencia(idExp).subscribe((dato) => {
          console.log(dato);
          this.getExperiencias();
          swal(
            'Experiencia eliminada',
            'La experiencia fue eliminada con exito',
            'success'
          );
        });
      }
    });
  }

  public getExperienciaById(idExp: number): void {
    this.experienciaService.getExperienciaById(idExp).subscribe({
      next: (Response: Experiencia) => {
        var datos = Response;

        this.idExp = datos.idExp;
        this.editTituloExp = datos.tituloExp;
        this.editNombreExp = datos.nombreExp;
        this.editFechaExp = datos.fechaExp;
        this.editDescripcionExp = datos.descripcionExp;
        this.editImagenExp = datos.imagenExp;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  /*  capturarFile(event:any){
  const archivoCapturado = event.target.files[0];
  this.extraerBase64(archivoCapturado).then((imagen:any) => {
    this.previsualizacion = imagen.base;
    console.log(imagen);
  })
   }

 extraerBase64 =async ($event:any) => new Promise ((resolve, reject) => {
  try {
    const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve({
        base: reader.result
      })
    };
    reader.onerror = error => {
      resolve ({
        base: null
      });
    };

  } catch (e) {

  }
 }); */
}
