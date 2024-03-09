import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }

    // Aquí, verifica si el usuario intentaba acceder a '/starships'
    else{//(state.url.includes('/main-page'))
      //Si el usuario no está logeado que redirija a /login pero una vez que se loguee que sea redirigido de vuelta a la pagina que intentó acceder originalmente
      //Cuando el usuario es redirigido a /login se incluye URL original a la que el usuario intentaba acceder como un parámetro de consulta llamado returnUrl.
      //Se consigue mediante la propiedad state.url del objeto RouterStateSnapshot, que representa la URL actual cuando se activó el guarda de al ruta.
      // this.router.navigate(['/account/login'], { queryParams: { accessDenied: 'main-page' } });
    // } else {
      //La URL original a la que se intentaba acceder se guarda en returnUrl
      this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });

    //url return tutorial angular comprobar
    //jsonwatmore login return url buscar web
    return false;
  }}
}
