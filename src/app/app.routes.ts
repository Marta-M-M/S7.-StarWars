import { Routes, RouterModule } from '@angular/router';
import { StarshipListComponent } from './starship-list/starship-list.component';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { StarshipCardsComponent } from './starship-cards/starship-cards.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

  // Indicamos que cuando la ruta sea la raíz de la aplicación se cargue el componente welcome
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'welcome',
    component: WelcomeComponent
  },

  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [AuthGuard]
  },


  {
    path: 'starship-list',
    component: StarshipListComponent
  },

  {
    path: 'starship-cards',
    component: StarshipCardsComponent
  },

  {
    path: 'account/login',
    component: LoginComponent
  },

  {
    path: 'account/register',
    component: RegisterComponent
  },

  // {
  //   path: '**',
  //   redirectTo: '/welcome' /*cuando no encuentra una ruta que se rediriga a pagina welcome.*/
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
