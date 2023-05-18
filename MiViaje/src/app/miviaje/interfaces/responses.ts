import { Comentario } from "./comment";
import { Itinerario } from "./itinerario";

export interface ItinerariosResponse {
  itinerarios: Itinerario[];
}

export interface ItinerarioResponse {
  itinerario: Itinerario;
}
export interface ComentariosResponse {
  comentarios: Comentario[];
}

export interface ComentarioResponse {
  comentario: Comentario;
}

// export interface TokenResponse {
//   accessToken: string;
// }
