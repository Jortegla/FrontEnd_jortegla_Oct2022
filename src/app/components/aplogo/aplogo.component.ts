import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';

@Component({
  selector: 'app-aplogo',
  templateUrl: './aplogo.component.html',
  styleUrls: ['./aplogo.component.css']
})
export class APlogoComponent implements OnInit {

  constructor(private router: Router, public loginService: IniciarSesionService) { }

  ngOnInit(): void {
  }

   public logout(): void {
    this.loginService.logout();
    this.router.navigate(['home'])
  }

}



