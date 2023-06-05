import { Comentario } from "./comment";
import { Contacto } from "./contacto";
import { Itinerario } from "./itinerario";
import { Lugar } from "./lugar";

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

export interface LugaresResponse {
  lugar: Lugar[];
}

export interface LugarResponse {
  lugar: Lugar;
}
export interface ContactosResponse {
  contacto: Contacto[];
}

export interface ContactoResponse {
  contacto: Contacto;
}
