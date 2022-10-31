import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Usuario } from 'src/app/interfaz/IUsuario';
import { CUsuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import swal from 'sweetalert2';



@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  form: FormGroup;
  public usuario: Usuario = new CUsuario();
  public editUsuario: Usuario | undefined;
  public usuarios: Usuario[] = [];
  public deleteUsuario: Usuario | undefined;
  public newUsuario: Usuario = new CUsuario();

  public id:number = 0;
  public username: String = " ";
  public password: String = " ";
  public nombre: String = " ";
  public apellido: String = " ";
  public email: String = " ";


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService) {

    this.form = this.formBuilder.group(
      {

      }
    )
   }

   ngOnInit(): void {

  }

formSubmit(){
  console.log(this.usuario);

  if(this.usuario.username == '' || this.usuario.username == null){
    swal('El nombre de usuario es requerido');
    return;
  }

  if(this.usuario.email == '' || this.usuario.email == null){
    swal('El email es requerido');
    return;
  }
  if(this.usuario.nombre == '' || this.usuario.nombre == null){
    swal('El nombre es requerido');
    return;
  }
  if(this.usuario.apellido == '' || this.usuario.apellido == null){
    swal('El apellido es requerido');
    return;
  }
  if(this.usuario.password == '' || this.usuario.password == null){
    swal('La contraseña es requerida');
    return;
  }
  if(this.usuario.password.length !== 5 ){
    swal('La contraseña debe contener 5 caracteres');
    return;
  }



  this.usuarioService.addUsuario(this.usuario).subscribe(
    (data) => {
      console.log(data);
      swal(
        'Usuario registrado',
        'El usuario fue registrado con exito',
        'success'
      );
    },
    (error) =>{
      console.log(error);
      swal('Ha ocurrido un error en el sistema');
    }
  )
}

  regresar(){
    this.router.navigate([''])
  }

  volver(){
    this.router.navigate(['login'])
  }
}
