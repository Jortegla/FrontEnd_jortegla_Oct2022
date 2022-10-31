import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';


const routes: Routes = [
  {
    path: 'home',
    component:HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo:'home',
    pathMatch: 'full',

  },
  {
    path:'login',
    component: IniciarSesionComponent
  },
  {
    path: 'registro',
    component: RegistroUsuarioComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
