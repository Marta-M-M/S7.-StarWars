import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StarshipsService } from '../services/starships.service';
import { Observable } from 'rxjs';
import { Starship, StarshipResults } from '../interface/starship';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, } from '@angular/router';


@Component({
  selector: 'app-starship-cards',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './starship-cards.component.html',
  styleUrl: './starship-cards.component.scss'
})

//Llamamos a nuestro service desde el componente
export class StarshipCardsComponent implements OnInit{
  //Al iniciar la página lo llamamos al service y almacenamos la información en un observable, que observará todos los resultados de la API starshipResults
  //Declara propiedad starshipResults$ que será de tipo observable de StarshipResults. El ! se usa para indicar que sea inicializada más tarde pq puede no tener valor en le momento en que se declara.

  //añadido 25/2/24
  imageUrl: string = "";

  // public starshipResults$!: Observable<StarshipResults>; //simbolo del dolar para identificar que es un observable DEL 20240223
  //asignamos el valor de currentStarship(servicio) a la propiedad index en nuestro componente StarshipCard.
  public index: number = this.starshipService.currentStarship;
  // public selectedShipIndex: number | null = null; // Variable para rastrear el índice de la nave seleccionada DEL 20240223


  //cambio esto inicializo el ship como undefined y le quito lo de this.starshipService... 28/2
  //cambio quito el ship: Starship y le digo que es igual a la lista starshipList del service que es donde estan los valores de naves en la api 01/03
  // public ship: Starship = this.starshipService.starshipList[this.index]; //mirar si el this.index lo está recogiendo
  // public ship: Starship | undefined;
  // public ship: Starship[] = []; //01/03
  public ship: Starship = this.starshipService.starshipList[this.starshipService.currentStarship]; //Esto lo ha hecho el profe en teoria se debe de hacer asi?

   //Emitimos un evento para cuando el usuario seleccione una nave
   @Output() public shipOnChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  //inyectamos el service para poder obtener la lista de las naves espaciales
  constructor(public starshipService: StarshipsService) {
    //quito esto del constructor y lo paso al ngOninit 28/02
    // this.index = this.starshipService.currentStarship;
    // console.log("valor del index, UNDEFINED O NO?", this.index);
    // const starshipId = this.starshipService.currentStarship;
    // this.imageUrl = this.starshipService.getImageUrl(starshipId);
    // console.log("Valor de .ship UNDEFINED O NO?", this.ship);
  }

  //cambio 28/02 Muevo toda la lógica de this.ship fuera del constructor y la pongo dentro de ngOnInit para que se ejecute después de que se haya cargado todas las propiedades del componente y que this.ship se ejecute después de que se haya cargado starshipList completamente
  ngOnInit(): void {
    this.index = this.starshipService.currentStarship;
    console.log("Current index:", this.index);
    const starshipId = this.starshipService.currentStarship;
    console.log("starshipID = ", starshipId);
    this.imageUrl = this.starshipService.getImageUrl(starshipId);
    console.log("imageUrl =", this.imageUrl);

    //cambiamos esto y quito this.ship =this.starshipService...añado esto
    // this.ship = this.starshipService.starshipList[this.index]; // Asignación de ship en ngOnInit()
    // Assign the ship property after getting the starshipList data
    this.starshipService.getStarshipList().subscribe((data) => {
      //Intentamos conseguir el valor con todas las naves del array API starshipList del service 01/03
      this.starshipService.starshipList = data.results;
      // this.starshipService.starshipList.push(...data.results);
      // this.ship = data.results; //quito el [this.index]// Assign the ship property after getting the starshipList data
      console.log("Index = ", this.index);
      console.log("data.results = ", data.results); //DATA.results tendria que devolver todo el array con todas las naves no solo 10 por eso al acceder y ver que index = 11 y no hay mas naves es undefined.
      console.log("Ship data:", this.ship);
      console.log("StarshipList concatenada en c.starshipCards = ", this.starshipService.starshipList);
    });
  }


  //metodo para volver hacia atras con el btn
   public goBackToStarship(){
    this.starshipService.changeView();
    this.shipOnChange.emit(this.starshipService.showShipCard);
   }

   //añadido 25/02/24 del mapping
   getImageUrl(index: number): string {
    return this.starshipService.getImageUrl(index);
  }

   //Llamamos a getImageUrl para obtener la URL de la imagen correspondiente a la nave seleccionada 25/02/24
  //  ngOnInit(): void {
  //   const starshipId = this.starshipService.getCurrentStarshipId();
  //   this.imageUrl = this.starshipService.getImageUrl(starshipId);
  // }

  // Método para cambiar la visibilidad de los detalles de la nave cuando se hace clic en su nombre
  // showDetails(index: number): void {
  //   if (this.selectedShipIndex === index) {
  //     this.selectedShipIndex = null; // Si ya estaba seleccionada, ocultar los detalles
  //   } else {
  //     this.selectedShipIndex = index; // Mostrar los detalles de la nave seleccionada
  //   }
  // }

}


