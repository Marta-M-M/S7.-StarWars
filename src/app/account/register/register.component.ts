import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { user } from '../../interface/user';
import { switchMap } from 'rxjs';

//Validadores
function nameSurnameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valido = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([a-zA-ZÀ-ÿ\u00f1\u00d1]{2,})$/g.test(control.value);
    return valido ? null : { 'nameSurnameInvalido': true };
  };
}

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valido = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/g.test(control.value);
    return valido ? null : { 'passwordInvalido': true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, RouterOutlet,]
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), nameSurnameValidator()]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3), nameSurnameValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), passwordValidator()]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatchValidator() }); // Añade aquí el validador al grupo

  // A continuación, define el validador para el grupo
  passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordsNotMatch: true };
    };
  }

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

    // Propiedad para almacenar el mensaje de error del registro
    registrationErrorMessage: string | null = null;

    //Registro
    register() {
      // Verifica si el formulario de registro es válido
      if (this.registerForm.valid) {
        // Obtiene los valores del formulario de registro
        const { name, surname, email, password } = this.registerForm.value;
        // Imprime en la consola los datos que se enviarán al servidor
        console.log('Datos enviados al servidor:', { name, surname, email, password });
        // Realiza una solicitud de registro a través del servicio de autenticación
        this.authService.register({
          username: name as string,
          usersurname: surname as string,
          email: email as string,
          password: password as string
          // y se suscribe al observable resultante
        }).pipe(
          // Utiliza switchMap para cambiar al observable devuelto por authService.login() después de completar el registro
          switchMap((user) => {
            // Guarda el usuario en el almacenamiento local
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Inicia sesión automáticamente con los datos de usuario registrados
            return this.authService.login(email as string, password as string);
          })
        ).subscribe({
          // La función que se ejecutará cuando la solicitud tenga éxito
          next: () => {
            // Inicio de sesión exitoso, redirige al usuario a la página original o a 'main-page'
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main-page';
            this.router.navigateByUrl(returnUrl);
          },
          // Maneja los errores durante el proceso de registro o inicio de sesión
          error: (error) => {
            if (error.status === 400) {
              this.registrationErrorMessage = 'This email is already in use. Please try another one.';
            } else {
              console.error('Error en el registro o inicio de sesión', error);
              this.registrationErrorMessage = 'An unexpected error occurred. Please try again.';
            }
          }
        });
      }
    }

  navigateToLogin() {
    this.router.navigate(['/account/login']); // Navega a la ruta de login
  }

}
