import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { StarshipListComponent } from './starship-list/starship-list.component';
import { NavComponent } from './nav/nav.component';
import { StarshipCardsComponent } from './starship-cards/starship-cards.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoginComponent, RegisterComponent, StarshipListComponent, NavComponent, StarshipCardsComponent, WelcomeComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'S7.-StarWars';
  //nuestro flag?

  // public showShipCard: boolean = false;

  // onChangeShipCard (parametro: boolean){
  //   this.showShipCard = parametro;
  // }


}
