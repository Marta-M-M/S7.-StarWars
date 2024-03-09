import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { StarshipListComponent } from '../starship-list/starship-list.component';
import { StarshipCardsComponent } from '../starship-cards/starship-cards.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, NavComponent, StarshipListComponent, StarshipCardsComponent, HeaderComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  public showShipCard: boolean = false;

  onChangeShipCard (parametro: boolean){
    this.showShipCard = parametro;
  }

}
