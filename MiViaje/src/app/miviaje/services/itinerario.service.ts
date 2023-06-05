import { tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';

import { Itinerario } from '../interfaces/itinerario';
import { ItinerarioResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class ItinerarioService {
  constructor(private readonly http: HttpClient) {}

  getItinerarioByEmail(email:String):any {
    return this.http.get('itinerario/' + email);
  }

  addItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.http
      .post<ItinerarioResponse>('itinerario', itinerario)
      .pipe(map((resp) => resp.itinerario));
  }

}
