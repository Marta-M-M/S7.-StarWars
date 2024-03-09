import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // Agrega una propiedad para el estado de autenticación
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentuser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  navigateToStarships(event: MouseEvent) {
    // Previene la navegación predeterminada solo si es necesario
    const currentRoute = this.router.url;

    if (currentRoute === '/starships' || currentRoute.includes('/starships/')) {
      event.preventDefault(); // Prevenir la navegación estándar del routerLink si ya estás en 'starships'
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/starships']);
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
