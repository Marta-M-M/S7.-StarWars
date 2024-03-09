import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Starship, StarshipResults } from '../interface/starship';


@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

  public starshipList: Starship[] = [];
  public showShipCard: boolean = false;
  public currentStarship!: number;
  private idMapping: number[] = [];
  public shipNum!: number;
  public currentPage: number = 1;
  public numShipPages: number = 0;
  public STARSHIPURL: string = 'https://swapi.dev/api/starships/?page=';
  public STARSHIPURL2: string = 'https://swapi.py4e.com/api/starships/?page=';

  constructor(private http: HttpClient) {

    this.initializeIdMapping();
    this.getStarshipList().subscribe((data) => {
      console.log("Datos de starshipList al inicio:", data);
      this.starshipList = data.results;
      console.log("Valor de starshipList al inicio:", this.starshipList);
    });
  }

  //metodo que retorna un observable de la interfaz StarshipResults
  getStarshipList(): Observable<StarshipResults> {
    //llamada a http que retornará el observable de tipo StarshipResults
    console.log("STARSHIPURL2 = [" + this.STARSHIPURL2 + "]");
    console.log("this.currentPage = [" + this.currentPage + "]");
    return this.http.get<StarshipResults>(this.STARSHIPURL2 + this.currentPage);
  }

  //metodo para cambiar la vista de un componente a otro. Si showShipCard=true --> tarjeta nave espacial if false -->lista naves
  changeView() {
    this.showShipCard = !this.showShipCard;
  }


  setCurrentStarship(i: number) {
    this.currentStarship = i;
    console.log("Current starship index:", this.currentStarship);
  }

  //25/02/24 Hacemos el mapeo entre los indices esperados y los IDs reales de la API. Porque el orden de las naves en la api está desordenado y no se corresponde con los ID de las url
  //Por tanto realizamos mapeo para que en la posición 0 sepamos que se encuentra la nave con el id=2 y poder pasar luego una url correcta
  private initializeIdMapping(): void {
    this.http.get<any>('https://swapi.dev/api/starships/')
      .subscribe(data => {
        // Obtener los IDs reales de la API en el orden en que se devuelven las naves
        const starshipIds: number[] = data.results.map((starship: any) => {
          const urlParts: string[] = starship.url.split('/');
          return +urlParts[urlParts.length - 2]; // Obtener el ID de la URL
        });
        // Construir el mapeo entre los índices esperados y los IDs reales de la API
        this.idMapping = starshipIds;

      });
  }

  // Método para obtener el ID real de la API a partir del índice esperado
  getApiId(index: number): number {
    return this.idMapping[index];
  }

  getImageUrl(index: number): string {
    const apiId: number = this.getApiId(index);
    return `https://starwars-visualguide.com/assets/img/starships/${apiId}.jpg`;
  }

  //Método para llamar a más naves en la API
  public viewMoreShips(): Observable<StarshipResults> {
    this.numShipPages = Math.ceil(this.shipNum / 10);
    if (this.currentPage >= this.numShipPages) {
    }
    // Incrementa currentPage para solicitar la siguiente página
    this.currentPage++;
    //Llama a getStarshipList() para obtener la siguiente página de la API
    return this.getStarshipList();

  }

}
