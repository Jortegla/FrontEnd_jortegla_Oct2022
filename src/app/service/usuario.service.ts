import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaz/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
    responseType: 'text' as 'json',
  };

  public addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.apiServerUrl}/usuarios/`,
      usuario
    );
  }

  public getUsuario(username: String): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiServerUrl}/usuarios/${username}`);
  }

  public deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/usuarios/${id}`);
  }


}
