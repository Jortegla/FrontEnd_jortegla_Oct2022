import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { IniciarSesionService } from 'src/app/service/iniciar-sesion.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {




  loginData = {
    "username": "",
    "password": "",
  };

  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: IniciarSesionService) {

    this.form = this.formBuilder.group(
      {

      }
    )
   }

   

  ngOnInit(): void {
  }

  registro(){
    this.router.navigate(['registro'])
  }

  formSubmit(){
    //console.log(this.logi)
   if(this.loginData.username.trim() == '' || this.loginData.username.trim() == null){
    swal('El nombre de usuario es requerido');
    return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null){
      swal('La contraseña es requerida');
      return;
      }

      this.loginService.generateToken(this.loginData).subscribe(
        (data:any)=> {
          console.log(data);

          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user:any)=> {
            this.loginService.setUser(user);
            console.log(user);

            if(this.loginService.getUserRole() == "ADMIN"){
              window.location.href = 'portfolio';
              this.loginService.loginStatusSubjec.next(true);
            }
            else if (this.loginService.getUserRole() == 'INVITADO'){
              window.location.href = 'portfolio';
              this.loginService.loginStatusSubjec.next(true);
            }
            else {
              this.loginService.logout();
            }
          })
        }, (error) =>{
          console.log(error);
          swal('Datos inválidos, vuelva a intentarlo')
        }
      )
  }
}
