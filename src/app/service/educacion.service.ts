import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { educacion } from '../interfaz/IEducacion';

@Injectable({
  providedIn: 'root',
})
export class EducacionService {
  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  public getEducacion(): Observable<educacion[]> {
    return this.http.get<educacion[]>(`${this.apiServerUrl}/educacion/traer`);
  }

  public getEducacionById(idEdu: number): Observable<educacion> {
    /* Use el tipo de dato educacion porque me devuelve un solo valor y asi me deja acceder a las propiedas del objeto sin recorrerlo*/
    return this.http.get<educacion>(
      `${this.apiServerUrl}/educacion/traer/${idEdu}`
    );
  }

  public addEducacion(educacion: educacion): Observable<educacion> {
    return this.http.post<educacion>(
      `${this.apiServerUrl}/educacion/crear`,
      educacion
    );
  }

  public editEducacion(educacion: educacion): Observable<educacion> {
    return this.http.put<educacion>(
      `${this.apiServerUrl}/educacion/editar/${educacion.idEdu}`,
      educacion
    );
  }

  public deleteEducacion(educacionId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/educacion/borrar/${educacionId}`
    );
  }
}
