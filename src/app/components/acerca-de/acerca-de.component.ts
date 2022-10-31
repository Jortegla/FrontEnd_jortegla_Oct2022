import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CPersona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { Persona } from 'src/app/interfaz/IPersona';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  constructor(private personaService: PersonaService, public login: IniciarSesionService) {}

  public persona: Persona = new CPersona();
  public editPersona: Persona | undefined;
  public personas: Persona[] = [];
  public deletePersona: Persona | undefined;
  public newPersona: Persona = new CPersona();

  public id: number = 0;
  public nombre: String = '';
  public apellido: String = '';
  public titulo: String = '';
  public foto: String = '';
  public descripcion: String = '';

  public editNombre: String = '';
  public editApellido: String = '';
  public editTitulo: String = '';
  public editFoto: String = '';
  public editDescripcion: String = '';

  ngOnInit(): void {
    this.getPersonas();
  }

  public getPersonas(): void {
    this.personaService.getPersona().subscribe({
      next: (Response: Persona[]) => {
        this.personas = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onEditPersona() {
    alert('Entre en onEditPersona');
    console.log(this);

    this.persona.id = this.id;
    this.persona.nombre = this.editNombre;
    this.persona.apellido = this.editApellido;
    this.persona.titulo = this.editTitulo;
    this.persona.foto = this.editFoto;
    this.persona.descripcion = this.editDescripcion;

    this.personaService.editPersona(this.persona).subscribe({
      next: (Response: Persona) => {
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public getPersonaById(id: number): void {
    this.personaService.getPersonaById(id).subscribe({
      next: (Response: Persona) => {
        var datos = Response;

        this.id = datos.id;
        this.editNombre = datos.nombre;
        this.editApellido = datos.apellido;
        this.editTitulo = datos.titulo;
        this.editFoto = datos.foto;
        this.editDescripcion = datos.descripcion;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
