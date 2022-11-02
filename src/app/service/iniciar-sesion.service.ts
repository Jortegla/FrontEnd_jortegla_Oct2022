import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  private apiServerUrl = 'https://portfolio-jortegla.herokuapp.com';
  public loginStatusSubjec = new Subject<boolean>();
  constructor(private http:HttpClient) { }

  //Generando Token
  public  generateToken(loginData: any){
    return this.http.post(`${this.apiServerUrl}/generate-token`, loginData)
  }

//Iniciando Sesion y estableciendo el token en localStorage
   public loginUser(token: any){
    localStorage.setItem('token', token);
}

public isLoggedIn(){
  let tokenStr = localStorage.getItem('token');

  if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
    return false;
  } else{
    return true;
  }
}

//Cerramos sesion y eliminamos el token de localStorage
public logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
}

//Obtenemos el token
public getToken(){
  let token = localStorage.getItem('token');
  return token;
}

public setUser(user:any){
  localStorage.setItem('user', JSON.stringify(user));
}

public getUser(){
  let userStr = localStorage.getItem('user');

  if(userStr != null){
    return JSON.parse(userStr);
  }else {
    this.logout();
    return null;
  }
}

public getUserRole(){
  let user = this.getUser();
  return user.authorities[0].authority;
}

public getCurrentUser(){
  return this.http.get(`${this.apiServerUrl}/actual-usuario`);
}
}
