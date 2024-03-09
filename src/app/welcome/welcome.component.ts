import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent],
  // 29/02 añadir el routemodule los imports de las rutas!!
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
