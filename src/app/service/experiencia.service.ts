import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../interfaz/IExperiencia';

@Injectable({
  providedIn: 'root',
})
export class ExperienciaService {
  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  public getExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(
      `${this.apiServerUrl}/experiencia/traer`
    );
  }

  public getExperienciaById(idExp: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(
      `${this.apiServerUrl}/experiencia/traer/${idExp}`
    );
  }

  public addExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(
      `${this.apiServerUrl}/experiencia/crear`,
      experiencia
    );
  }

  public editExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(
      `${this.apiServerUrl}/experiencia/editar/${experiencia.idExp}`,
      experiencia
    );
  }

  public deleteExperiencia(experienciaId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/experiencia/borrar/${experienciaId}`
    );
  }
}

/*
@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private apiServerUrl = environment.URL;

  constructor(private http: HttpClient) { }

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": '*'
    } ),responseType: 'text' as 'json'
  };

  public getEducacion(): Observable<educacion[]>{
    return this.http.get<educacion[]>(`${this.apiServerUrl}/educacion/traer`);
  }

  public getEducacionById(idEdu: number): Observable<educacion>{
  return this.http.get<educacion>(`${this.apiServerUrl}/educacion/traer/${idEdu}`);
}

public addEducacion(educacion: educacion): Observable<educacion>{
  return this.http.post<educacion>(`${this.apiServerUrl}/educacion/crear`, educacion);
}

public editEducacion(educacion: educacion): Observable<educacion>{
  return this.http.put<educacion>(`${this.apiServerUrl}/educacion/editar/${educacion.idEdu}?tituloEdu=${educacion.tituloEdu}&institutoEdu=${educacion.institutoEdu}&lugarEdu=${educacion.lugarEdu}&estadoEdu=${educacion.estadoEdu}&fechaEdu=${educacion.fechaEdu}&logoEdu=${educacion.logoEdu}`, {});
}


public deleteEducacion(educacionId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/educacion/borrar/${educacionId}`);
}
}
*/
