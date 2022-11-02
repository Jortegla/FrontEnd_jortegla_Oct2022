import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../interfaz/ISkill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  public getSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiServerUrl}/skills/traer`);
  }

  public getSkillById(idSk: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiServerUrl}/skills/traer/${idSk}`);
  }

  public addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiServerUrl}/skills/crear`, skill);
  }

  public editSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.apiServerUrl}/skills/editar/${skill.idSk}`,
      skill
    );
  }

  public deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/skills/borrar/${skillId}`
    );
  }
}
