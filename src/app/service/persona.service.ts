import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../interfaz/IPersona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  public addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(
      `${this.apiServerUrl}/persona/crear`,
      persona
    );
  }
  public getPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiServerUrl}/persona/traer`);
  }

  public editPersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(
      `${this.apiServerUrl}/persona/editar/${persona.id}`,
      persona
    );
  }

  public getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiServerUrl}/persona/traer/${id}`);
  }
  public deletePersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/persona/borrar/${id}`);
  }
}
