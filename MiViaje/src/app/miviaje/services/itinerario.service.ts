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
  private readonly USERS_REGISTER_URL = 'auth/register';
  private readonly USERS_LOGIN_URL = 'auth/login';
  constructor(private readonly http: HttpClient) {}
  postUser() {
    return this.http.get('http://localhost:3000/auth/logina');
  }
  addItinerario(itinerario: Itinerario): Observable<Itinerario> {
    return this.http
      .post<ItinerarioResponse>('itinerario', itinerario)
      .pipe(map((resp) => resp.itinerario));
  }

}
