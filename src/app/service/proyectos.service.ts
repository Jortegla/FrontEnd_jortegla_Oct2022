import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../interfaz/IProyectos';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  public getProyectos(): Observable<Proyectos[]> {
    return this.http.get<Proyectos[]>(`${this.apiServerUrl}/proyectos/traer`);
  }

  public getProyectosById(idProy: number): Observable<Proyectos> {
    return this.http.get<Proyectos>(
      `${this.apiServerUrl}/proyectos/traer/${idProy}`
    );
  }

  public addProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.post<Proyectos>(
      `${this.apiServerUrl}/proyectos/crear`,
      proyectos
    );
  }

  public editProyectos(proyectos: Proyectos): Observable<Proyectos> {
    return this.http.put<Proyectos>(
      `${this.apiServerUrl}/proyectos/editar/${proyectos.idProy}?nombreProy=${proyectos.nombreProy}&fechaProy=${proyectos.fechaProy}&descripcionProy=${proyectos.descripcionProy}&fotoProy=${proyectos.fotoProy}`,
      {}
    );
  }

  public deleteProyectos(proyectosId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/proyectos/borrar/${proyectosId}`
    );
  }
}
