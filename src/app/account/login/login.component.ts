import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, RouterOutlet]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showAccessDeniedMessage = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Actualiza el mensaje basado en queryParams cada vez que cambian
      this.showAccessDeniedMessage = params['accessDenied'] === 'main-page';
    });
  }

  login() {
    //solicitud inicio sesión a auth.service (correo,password) proporcionados por usuario en inicio sesión. Se suscribe a la respuesta para manejar el resultado de la solicitud
    this.authService.login(this.email, this.password).subscribe({
      //si solicitud es exitosa-->credenciales válidas-->autenticado correctamente-->redirección main-page
      next: (user) => {
        console.log('Login exitoso', user);
        // Redirige a '/main-page' o a la página que se intentó acceder
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main-page';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        console.error('Error en login', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/account/register']);
  }
}
