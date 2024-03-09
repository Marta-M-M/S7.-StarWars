import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StarshipsService } from '../services/starships.service';
import { Observable } from 'rxjs';
import { Starship, StarshipResults } from '../interface/starship';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-starship-list',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.scss'
})
//Llamamos a nuestro service desde el componente
export class StarshipListComponent implements OnInit {
  public starshipList: Starship[] = [];
  public numShipPages: number = 0;

  //Al iniciar la página lo llamamos al service y almacenamos la información en un observable, que observará todos los resultados de la API starshipResults
  public starshipResults$!: Observable<StarshipResults>; //simbolo del dolar para identificar que es un observable


  //inyectamos el service
  constructor(private starshipService: StarshipsService) { }


  ngOnInit(): void {
    //llamamos al servicio para obtener la lista de naves y al recibir la respuesta asignamos esta al arreglo starshipList.
    this.starshipService.getStarshipList().subscribe((info) => {
      if (info && info.results){
      this.starshipService.starshipList = info.results;
      this.starshipService.shipNum = info.count;
      //añado concatenación para que las naves anteriores se mantengan en la lista 01/03
      // this.starshipList = this.starshipService.starshipList.concat(info.results);
      this.starshipList = info.results;
      console.log("starshipLIST del ngOninit c starhsipList = ", this.starshipList);
      console.log("Info results, comp starshiplist = ", info.results);
      } else {
        //validamos si el valor de starShipList devuelve undefined o no
        console.error("Error: No se obtuvieron datos válidos de las naves espaciales.");
      }

    });
  }

  //Emitimos un evento para cuando el usuario seleccione una nave
  @Output() public shipOnChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  //Método para cambiar la visualización al otro componente starship-cards-nuestro flag
  public showSelectShip(i: number) {
    console.log("selected starship index:", i)
    this.starshipService.changeView(); //cambiamos la visualización a ship-card a través de nuestro servicio
    this.starshipService.currentStarship = i; //enviamos al servicio el n1 de nave que ha clicado el usuario
    this.shipOnChange.emit(this.starshipService.showShipCard); //emitimos al componente padre (app.component) el flag(boolean) para visualizar el list o las cards-detalladas
  }

  //Método para agregar más naves 27/02
  public viewMoreShips() {
    this.starshipService.viewMoreShips().subscribe((info) => {
      this.starshipService.starshipList.push(...info.results);
    console.log("Info.results comp.starshiplist", info.results);
    console.log("Lista naves en starshipList(service) pero en componente starshiplist", this.starshipService.starshipList);
    });
  }
}


