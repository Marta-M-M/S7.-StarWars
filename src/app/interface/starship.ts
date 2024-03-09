export interface Starship {
  //lo que definirá a la nave
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string,
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface StarshipResults {
  count: number; //numero de registros de la API
  next: string;
  previous: string; //si tiene pagina previa
  results: Starship[]; //los resultados son un array de Starship
}
