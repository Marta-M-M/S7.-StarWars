import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user } from '../interface/user';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  //almacena el usuario autenticado en currentuserSubject
  public currentuserSubject: BehaviorSubject<user | null>;
  //Observable currentuser para modificar el usuario actual desde otros componentes
  public currentuser: Observable<user | null>;

  constructor(private http: HttpClient, private router: Router) {
    //para recuperar del almacenamiento local al usuario logeado, aunque se haya cerrado la página
    const isBrowser = typeof window !== 'undefined'; // comprueba si existe en el navegador
    const storeduser = isBrowser ? localStorage.getItem('currentUser') : null; // Accede a localStorage solo si está en el navegador
    this.currentuserSubject = new BehaviorSubject<user | null>(storeduser ? JSON.parse(storeduser) : null);
    this.currentuser = this.currentuserSubject.asObservable();
  }

  public get currentUserValue(): user | null {
    return this.currentuserSubject.value;
  }

  login(email: string, password: string) {
    //solicitud POST //cambio a account/login en vez de /login 05/03 -->esto esta MAL ES UN ERROR!
    console.log("Ha entrado el login de auth.service");
    //He cambiado la solicitud post de account/login a LOGIN!! Ese era el problema!
    return this.http.post<any>(`http://localhost:3000/login`, { email, password }).pipe(

    //almacenamos la respuesta en almacenamiento local del navegador.
    tap(user => {
      //hacer un if de si el login es true-->redirigir a la main-page?
        console.log('Login exitoso auth.service', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentuserSubject.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentuserSubject.next(null);

    // Redirige al usuario al login
    this.router.navigate(['/account/login']);
  }
//Hacemos llegar los datos del formulario nos devolverá si ha ido bien o mal
  register(user: user) {
    return this.http.post(`http://localhost:3000/signup`, user);
  }




  //Quito el register con la lógica del chequear el email para ver si funciona el backend y el problema es ese 05/03
//   register(user: user) {
//     // Verificar si el email ya está registrado antes de enviar la solicitud
//   return this.checkEmailExists(user.email).pipe(
//     switchMap(emailExists => {
//       if (!emailExists) {
//         // El email no está registrado, proceder con el registro
//         return this.http.post(`http://localhost:3000/account/register`, user);
//       } else {
//         // El email ya está registrado, devolver un Observable de error
//         return throwError(() => new Error('El email ya está registrado'));

//       }
//     })
//   );
// }

// private checkEmailExists(email: string): Observable<boolean> {
//   return this.http.get<boolean>(`http://localhost:3000/account/check-email-exists?email=${email}`); //añadir /account/register?
// }
}
